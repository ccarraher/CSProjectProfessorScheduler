package base.models;

import java.util.List;
import java.util.Map;

public class AvailabilityDto {
    
    private String netId;
    private Map<String, List<String>> timeSlots; // Map of days to time slots

    public AvailabilityDto(String netId, Map<String, List<String>> timeSlots) {
        this.netId = netId;
        this.timeSlots = timeSlots;
    }

    // Getters and Setters
    public String getNetID() {
        return netId;
    }

    public void setNetID(String netID) {
        this.netId = netID;
    }

    public Map<String, List<String>> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(Map<String, List<String>> timeSlots) {
        this.timeSlots = timeSlots;
    }

    
}
