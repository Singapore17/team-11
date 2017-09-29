/**
 * Created by bill on 29/9/17.
 */

import org.joda.time.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


public class Main {
    public static void main (String[] args) {

        DateTime date1 = new DateTime("2017-01-01T01:00:00+08:00");
        DateTime date2 = new DateTime("2017-01-01T02:00:00+08:00");
        DateTime date3 = new DateTime("2017-01-01T03:00:00+08:00");
        DateTime date4 = new DateTime("2017-01-01T04:00:00+08:00");
        DateTime date5 = new DateTime("2017-01-01T05:00:00+08:00");
        DateTime date6 = new DateTime("2017-01-01T06:00:00+08:00");
        DateTime date7 = new DateTime("2017-01-01T07:00:00+08:00");
        DateTime date8 = new DateTime("2017-01-01T08:00:00+08:00");
        DateTime date9 = new DateTime("2017-01-01T09:00:00+08:00");
        DateTime date10 = new DateTime("2017-01-01T10:00:00+08:00");
        DateTime date11 = new DateTime("2017-01-01T11:00:00+08:00");
        DateTime date12 = new DateTime("2017-01-01T12:00:00+08:00");

        user A1 = new user();
        DateTime[] DATE1 = new DateTime[2];
        DATE1[0] = date6;
        DATE1[1] = date7;
        A1.timeSlots.add(DATE1);
        A1.lat = 1.323574;
        A1.lng = 103.870111;
        A1.transport = true;
        A1.care = false;

        user B1 = new user();
        DateTime[] DATE2 = new DateTime[2];
        DATE2[0] = date1;
        DATE2[1] = date5;
        B1.timeSlots.add(DATE2);
        DateTime[] DATE3 = new DateTime[2];
        DATE3[0] = date8;
        DATE3[1] = date12;
        B1.timeSlots.add(DATE3);
        B1.lat = 1.373503;
        B1.lng = 103.89822;
        B1.transport = true;
        B1.care = true;
        B1.UID = "Belle";

        user B2 = new user();
        DateTime[] DATE4 = new DateTime[2];
        DATE4[0] = date5;
        DATE4[1] = date9;
        B2.timeSlots.add(DATE4);
        B2.lat = 1.373235;
        B2.lng = 103.893929;
        B2.transport = true;
        B2.care = true;
        B2.UID = "Andie";

        B1.score = (int) A1.returnScore(B1);
        B2.score = (int) A1.returnScore(B2);

        List<user> userList = new ArrayList<user>();
        userList.add(B1);
        userList.add(B2);

        Collections.sort(userList, new Comparator<user>(){
            public int compare(user o1, user o2){
                if(o1.score == o2.score)
                    return 0;
                return o1.score < o2.score ? -1 : 1;
            }
        });

        for(int i = 0; i < userList.size(); i++) {
            userList.get(i).printScore();
        }



//        System.out.println(A.returnScore(B));
//        System.out.println(A.returnScore(B));

    }
}