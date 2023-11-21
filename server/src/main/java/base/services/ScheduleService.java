package base.services;

import base.entities.*;
import base.models.*;
import base.repositories.*;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.chocosolver.solver.Model;
import org.chocosolver.solver.variables.IntVar;
import org.chocosolver.solver.constraints.Constraint;
import org.chocosolver.solver.Solver;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.stream.IntStream;
import java.util.*;

@Service
public class ScheduleService {

	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private AvailabilityRepository availabilityRepository;
	@Autowired
	private CoursePreferenceRepository coursePreferenceRepository;
	@Autowired
    private PreviousSemesterScheduleRepository previousSemesterScheduleRepository;

    private Map<String, List<int[]>> professorAssignedTimes;

	public void createSchedule() {
	    // Fetch data from repositories
		List<Course> courses = courseRepository.findAll();
		System.out.println("Courses: " + courses.size());

		List<Availability> availabilities = availabilityRepository.findAll();
		System.out.println("Availabilities: " + availabilities.size());

		List<CoursePreference> coursePreferences = coursePreferenceRepository.findAll();
		System.out.println("Course Preferences: " + coursePreferences.size());

		List<PreviousSemesterSchedule> prevSchedules = previousSemesterScheduleRepository.findAll();
    	System.out.println("Previous Semester Schedules: " + prevSchedules.size());

	    // Initialize the model
    	Model model = new Model("University Scheduling");

		// Maps and variables for professors and courses
		Map<String, Integer> professorMap = new HashMap<>();
		Map<Integer, Integer> courseMap = new HashMap<>();
		Map<Integer, List<int[]>> professorAvailability = new HashMap<>();
		Map<String, Set<Integer>> professorPreferences = new HashMap<>();

		// Populate maps and variables
		populateMapsAndVariables(availabilities, coursePreferences, professorMap, courseMap, professorAvailability, professorPreferences, courses);


		// Define variables for assigning professors to class sections
    	IntVar[] professors = model.intVarArray("professors", prevSchedules.size(), 0, professorMap.size() - 1);

		 // Loop over each previous semester schedule to set constraints
		for (int sectionIndex = 0; sectionIndex < prevSchedules.size(); sectionIndex++) {
			PreviousSemesterSchedule prevSection = prevSchedules.get(sectionIndex);
			Course course = findCourseForPrevSection(prevSection, courses);

			if (course != null) {
				int[] classTime = parseClassTime(prevSection.getTime());
				String[] classDays = prevSection.getDays().split(",\\s*");

				Constraint[] possibleAssignments = buildConstraintsForPrevSection(
					sectionIndex, classTime, classDays, course, professorMap, professorPreferences, professorAvailability, model, professors, courseMap, prevSection.getInstructorId()
				);

				if (possibleAssignments.length > 0) {
					model.or(possibleAssignments).post();
				} else {
					professors[sectionIndex] = model.intVar("noProfessor", -1, -1);
				}
			}
		}

		// Solve the model and print the solution
		solveAndPrintSolution(model, professors, prevSchedules, courses, professorMap);
    }

	private Course findCourseForPrevSection(PreviousSemesterSchedule prevSection, List<Course> courses) {
		return courses.stream()
					  .filter(c -> c.getCourseId().equals(prevSection.getCourseId()))
					  .findFirst()
					  .orElse(null);
    }

	private int[] parseClassTime(String time) {
	    String[] timeParts = time.split(" - ");
	    LocalTime startTime = parseTime(timeParts[0]);
	    LocalTime endTime = parseTime(timeParts[1]);

	    return new int[] { startTime.toSecondOfDay(), endTime.toSecondOfDay() };
	}

	private void populateMapsAndVariables(
	    List<Availability> availabilities,
	    List<CoursePreference> coursePreferences,
	    Map<String, Integer> professorMap,
	    Map<Integer, Integer> courseMap,
	    Map<Integer, List<int[]>> professorAvailability,
	    Map<String, Set<Integer>> professorPreferences,
	    List<Course> courses // Corrected parameter list
	) {
	    // Populate courseMap with course IDs
	    for (Course course : courses) {
	        courseMap.put(course.getCourseId(), courseMap.size());
	    }

	    // Populate professorMap and professorAvailability
	    for (Availability availability : availabilities) {
	        String netID = availability.getNetID();
	        int profIndex = professorMap.computeIfAbsent(netID, k -> professorMap.size());
	        professorAvailability.putIfAbsent(profIndex, new ArrayList<>());
	        professorAvailability.get(profIndex).add(convertAvailability(availability));
	    }

	    // Populate professorPreferences
	    for (CoursePreference preference : coursePreferences) {
	        String netID = preference.getNetId();
	        int courseId = preference.getCourseId();
	        professorPreferences.computeIfAbsent(netID, k -> new HashSet<>()).add(courseId);
	    }

	    // Initialize professorAssignedTimes
		professorAssignedTimes = new HashMap<>();
		for (String netID : professorMap.keySet()) {
			professorAssignedTimes.put(netID, new ArrayList<>());
		}
	}


	private Constraint[] buildConstraintsForPrevSection(
	    int sectionIndex, int[] classTime, String[] classDays, Course course,
	    Map<String, Integer> professorMap, Map<String, Set<Integer>> professorPreferences,
	    Map<Integer, List<int[]>> professorAvailability, Model model, IntVar[] professors,
	    Map<Integer, Integer> courseMap, String prevInstructorID
	) {
	    List<Constraint> possibleAssignments = new ArrayList<>();
	    Integer courseId = course.getCourseId(); // Add this line to get the course ID

	    for (Map.Entry<String, Integer> entry : professorMap.entrySet()) {
	        String professorNetID = entry.getKey();
	        int professorIndex = entry.getValue();

	        Set<Integer> preferredCourses = professorPreferences.get(professorNetID);
        	if (preferredCourses != null && preferredCourses.contains(courseId)) {
				List<int[]> availableTimes = professorAvailability.get(professorIndex);
				boolean isAvailableAllDays = true;

				for (String day : classDays) {
					int dayIndex = dayToIndex(day.trim());
					boolean isAvailableThisDay = false;

					for (int[] timeSlot : availableTimes) {
						if (timeSlot[0] == dayIndex && timeSlot[1] < classTime[1] && timeSlot[2] > classTime[0]) {
							isAvailableThisDay = true;
							break;
						}
					}

					if (!isAvailableThisDay) {
						isAvailableAllDays = false;
						break;
					}
				}

				if (isAvailableAllDays && !hasTimeOverlap(classTime, professorAssignedTimes.get(professorNetID))) {
					possibleAssignments.add(model.arithm(professors[sectionIndex], "=", professorIndex));
					professorAssignedTimes.get(professorNetID).add(classTime); // Add this class time to the professor's schedule
				}
			}
		}

		return possibleAssignments.toArray(new Constraint[0]);
	}

	private boolean hasTimeOverlap(int[] classTime, List<int[]> assignedTimes) {
	    if (assignedTimes == null) {
	        return false;
	    }

	    for (int[] assignedTime : assignedTimes) {
	        if ((classTime[0] < assignedTime[1] && classTime[1] > assignedTime[0]) ||
	            (assignedTime[0] < classTime[1] && assignedTime[1] > classTime[0])) {
	            return true;
	        }
	    }
	    return false;
	}

	private boolean isProfessorAvailableOnDays(List<int[]> availability, int[] classTime) {
	    for (int[] timeSlot : availability) {
	        if (timeSlot[0] == classTime[0] && timeSlot[1] <= classTime[1] && timeSlot[2] >= classTime[2]) {
	            return true; // Professor is available for this class time
	        }
	    }
	    return false; // Professor is not available for this class time
	}


	private int dayToIndex(String day) {
	    // Example implementation for converting day string to an index
	    switch (day.toLowerCase()) {
	        case "monday": return 0;
	        case "tuesday": return 1;
	        case "wednesday": return 2;
	        case "thursday": return 3;
	        case "friday": return 4;
	        // Add other days if needed
	        default: return -1; // Invalid day
	    }
	}



	private void solveAndPrintSolution(
	        Model model, IntVar[] professors, List<PreviousSemesterSchedule> prevSchedules,
	        List<Course> courses, Map<String, Integer> professorMap
	    ) {
	        Solver solver = model.getSolver();
	        if (solver.solve()) {
	            System.out.println("Solution:");
	            for (int i = 0; i < professors.length; i++) {
	                final int professorIndex = professors[i].getValue(); // Final variable for lambda

	                PreviousSemesterSchedule prevSection = prevSchedules.get(i);
	                Course course = findCourseForPrevSection(prevSection, courses);

	                if (professorIndex >= 0) {
	                    String netID = professorMap.entrySet().stream()
	                        .filter(entry -> entry.getValue().equals(professorIndex))
	                        .map(Map.Entry::getKey)
	                        .findFirst()
	                        .orElse("Unknown NetID");

	                    String courseName = course != null ? course.getPrefix() + " " + course.getCourseNumber() : "Unknown Course";
	                    System.out.println(netID + " is assigned to " + courseName + " " + prevSection.getSectionNumber());

	                    // Update the PreviousSemesterSchedule with the assigned netID
	                    prevSection.setInstructorId(netID);
	                    previousSemesterScheduleRepository.save(prevSection);
	                } else {
	                    String courseName = course != null ? course.getPrefix() + " " + course.getCourseNumber() : "Unknown Course";
	                    System.out.println("No professor can be assigned to " + courseName + " " + prevSection.getSectionNumber());
	                }
	            }
	        } else {
	            System.out.println("No solution found.");
	        }
    	}


	private int[] convertAvailability(Availability availability) {
	    String[] times = availability.getTimeSlot().split(" - ");
	    LocalTime startTime = parseTime(times[0]);
	    LocalTime endTime = parseTime(times[1]);
	    int dayIndex = dayToIndex(availability.getDay());

	    return new int[] { dayIndex, startTime.toSecondOfDay(), endTime.toSecondOfDay() };
	}


    public PreviousSemesterScheduleResponseDto getPreviousSemesterSchedule(String netId) {
	        List<PreviousSemesterSchedule> previousSemesterSchedule = previousSemesterScheduleRepository.findPreviousSemesterByNetId(netId);
	        CourseDetailDto[] courseDetails = previousSemesterSchedule.stream().map(x -> {
	            Course course = courseRepository.findById(x.getCourseId()).get();
	            String classNumber = course.getPrefix() + " " + course.getCourseNumber() + "." + x.getSectionNumber();
	            String[] timeParts = x.getTime().split(" - ");
	            LocalTime startTime = parseTime(timeParts[0].replace("am", "AM").replace("pm", "PM"));
	            LocalTime endTime = parseTime(timeParts[1].replace("am", "AM").replace("pm", "PM"));

	            return new CourseDetailDto(classNumber, course.getCourseName(), startTime, endTime, x.getDays().split(", "), netId);
	        }).toArray(CourseDetailDto[]::new);
	        PreviousSemesterScheduleResponseDto response = new PreviousSemesterScheduleResponseDto(courseDetails);
	        return response;
	    }

	    private static LocalTime parseTime(String timeString) {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mma");
	        try {
	            return LocalTime.parse(timeString.toUpperCase(), formatter);
	        } catch (DateTimeParseException e) {
	            // Handle the exception appropriately
	            System.err.println("Failed to parse time: " + e.getMessage());
	            return null; // or throw an exception
	        }
    }
}