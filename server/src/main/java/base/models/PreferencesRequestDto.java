package base.models;

import java.util.List;

public class PreferencesRequestDto {
    private String netId;
    private List<Integer> selectedCourses;

    public String getNetId() {
        return netId;
    }

    public void setNetId(String netId) {
        this.netId = netId;
    }

    public List<Integer> getSelectedCourses() {
        return selectedCourses;
    }

    public void setSelectedCourses(List<Integer> selectedCourses) {
        this.selectedCourses = selectedCourses;
    }
}