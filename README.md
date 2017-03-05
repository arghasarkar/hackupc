# hackupc

Initial Analysis

![Lat Long Analysis](tableau1.png)

- Red : Fatal Accident
- Blue : Slight Accident


```
decimal  degrees    distance
places
-------------------------------  
0        1.0        111 km
1        0.1        11.1 km
2        0.01       1.11 km
3        0.001      111 m
4        0.0001     11.1 m
5        0.00001    1.11 m
6        0.000001   0.111 m
7        0.0000001  1.11 cm
8        0.00000001 1.11 mm
```

###### Model : Random Forest (Predicting Accident Type)
- GeoHashing
- trained on balanced classes
- 6k observations
- Accuracy 40%
- state of art for Crime Prediction 50%
- Featuers : Accident_Severity ~ GeoHash + Light_Conditions + Weather_Conditions + Day_of_Week

###### Model : Random Forest (Predicting Geo Location based on date and Time)
- Imbalanced Classes
- Time to second conversion
- 10k records
- Featuers : GeoHash ~ Day_of_Week + time_num
- Quite Low

