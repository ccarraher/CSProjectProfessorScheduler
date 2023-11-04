package base.models;

import jakarta.persistence.*;

@Entity
@Table(name = "availability")
public class Availability {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "AvailabilityId")
    public Integer availabilityId;
    @Column(name = "NetID")
    public String netID;

    @Column(name = "Day")
    public String day;

    @Column(name = "TimeSlot")
    public String timeSlot;

    public Integer getAvailabilityId() {
        return availabilityId;
    }

    public void setAvailabilityId(Integer availabilityId) {
        this.availabilityId = availabilityId;
    }

    public String getNetID() {
        return netID;
    }

    public void setNetID(String netID) {
        this.netID = netID;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
}
