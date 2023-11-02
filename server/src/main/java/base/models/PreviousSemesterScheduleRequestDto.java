package base.models;

public class PreviousSemesterScheduleRequestDto {
    private String netId;

    public PreviousSemesterScheduleRequestDto() {}

    public PreviousSemesterScheduleRequestDto(String netId) {
        super();
        this.netId = netId;
    }

    public String getNetId() {
        return this.netId;
    }

    public void setNetId(String netId) {
        this.netId = netId;
    }
}
