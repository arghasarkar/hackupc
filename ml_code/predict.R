model1_predict <- function(lat, long, Light_Conditions, Weather_Conditions, Day_of_Week){
  library(caret)
  library(randomForest)
  library(geohash)
  encode <- gh_encode(lat = as.numeric(lat), lng = as.numeric(long), precision = 3)
  input <- cbind(encode, Light_Conditions, Weather_Conditions, Day_of_Week)
  test <- data.frame(input)
  names(test) <- c('encode','Light_Conditions', 'Weather_Conditions', 'Day_of_Week')
  
  Day_of_Week_l <- c(1,2,3,4,5,6,7)
  Weather_Conditions_l <- c(-1, 1, 2, 3, 4, 5, 6, 7, 8, 9)
  Light_Conditions_l <- c(1,4,5,6,7)
  encode_l <- c("gbg","gbu","gbv","gby","gbz","gcg","gch","gcj","gck","gcm","gcn","gcp","gcq","gcr","gcs","gct","gcu","gcv","gcw","gcx","gcy","gcz","gf4","gf5","gf6","gf7","gfh","gfj","gfk","gfm","gfn","gfq","gft","gfw","gfx","gfy","gfz","u10","u11","u12","u13","u18")
  levels(test$encode) <- encode_l
  levels(test$Day_of_Week) <-Day_of_Week_l
  levels(test$Light_Conditions) <- Light_Conditions_l
  levels(test$Weather_Conditions) <- Weather_Conditions_l
  load(file = "../model_objects/model1_0.1.rda")
  
  y_hat <- predict(model1, test, type='prob')

  return(y_hat)
}

args <- commandArgs(trailingOnly=TRUE)
model1_predict(args[1], args[2], as.numeric(args[3]), as.numeric(args[4]), as.numeric(args[5]))


