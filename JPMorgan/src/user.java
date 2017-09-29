/**
 * Created by bill on 29/9/17.
 */

import java.util.ArrayList;
import org.joda.time.*;


public class user {
    String UID;
    ArrayList<DateTime[]> timeSlots;
    double lat;
    double lng;
    boolean transport;
    boolean care;
    int score;

    public user() {
        timeSlots = new ArrayList<>();
    }

    public user(ArrayList<DateTime[]> time, double lat, double lng, boolean transport, boolean care) {
        this.timeSlots = timeSlots;
        this.lat = lat;
        this.lng = lng;
        this.transport = transport;
        this.care = care;

    }

    public double calcLocation(user B){
        double lat1 = this.lat;
        double lng1 = this.lng;
        double lat2 = B.lat;
        double lng2 = B.lng;

        double earthRadius = 6371000; //meters
        double dLat = Math.toRadians(lat2-lat1);
        double dLng = Math.toRadians(lng2-lng1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLng/2) * Math.sin(dLng/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        double dist = (double) earthRadius * c;

        return dist;
    }

    public boolean compareServices(user B) {
        return this.transport && B.transport || this.care && B.care;
    }

    public boolean compareTime(user B){
        ArrayList<DateTime[]> timeSlotsB = B.timeSlots;

        // for each time slot in A
        for (int i = 0; i < timeSlots.size(); i++){

            // check timeslot in B
            for (int j = 0; j < timeSlotsB.size(); j++){
                // if there is a match, break
                // else, return false

                // check before
                if(timeSlots.get(i)[0].isBefore(timeSlotsB.get(j)[0])){

                    //check after
                    if(timeSlots.get(i)[1].isAfter(timeSlotsB.get(j)[1])){
                        // match found, break out of B loop
                        break;
                    }
                }

                // if it reaches the end of timeSlotsB, return a false
                if(j == timeSlotsB.size()){
                    return false;
                }
            }
        }

        // if all timeslots are satisfied
        return true;
    }

    public double returnScore(user B) {
        //return this.calcLocation(B);

        if (compareTime(B) && this.compareServices(B)) {
            return this.calcLocation(B);
        }
        return 0;
    }

    public void printScore(){
        System.out.print(this.UID);
        System.out.print(" ");
        System.out.println(this.score);
    }

    public int compareTo(user o)
    {
        return(this.score - o.score);
    }

}