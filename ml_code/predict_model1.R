library(caTools)
library(geohash)
library(caret)
library(doMC)
library(randomForest)
registerDoMC(4)

load(file = "model1_pred_accident_sev.rda")


encode + Light_Conditions + Weather_Conditions + Day_of_Week

encode <- 'gcp'
Light_Conditions <- 4 
Weather_Conditions <- 1
Day_of_Week <- 7

input <- cbind(encode,Light_Conditions, Weather_Conditions, Day_of_Week)
input <- sapply( input, as.factor )
input <- data.frame(t(input))
names(input) <- 

str(input)
str(input)
summary(model1)
predict(model1, input)

Day_of_Week_l <- c(1,2,3,4,5,6,7)
Weather_Conditions_l <- c(-1, 1, 2, 3, 4, 5, 6, 7, 8, 9)
Light_Conditions_l <- c(1,4,5,6,7)
Accident_Severity_l <- c(1, 2, 3)
encode_l <- c("gbg","gbu","gbv","gby","gbz","gcg","gch","gcj","gck","gcm","gcn","gcp","gcq","gcr","gcs","gct","gcu","gcv","gcw","gcx","gcy","gcz","gf4","gf5","gf6","gf7","gfh","gfj","gfk","gfm","gfn","gfq","gft","gfw","gfx","gfy","gfz","u10","u11","u12","u13","u18")

test <- data.frame(input)
names(test) <- c('encode','Light_Conditions', 'Weather_Conditions', 'Day_of_Week')

levels(test$encode) <- encode_l
levels(test$Day_of_Week) <-Day_of_Week_l
levels(test$Light_Conditions) <- Light_Conditions_l
levels(test$Weather_Conditions) <- Weather_Conditions_l

predict(model1, test)


model1_predict <- function(encode, Light_Conditions, Weather_Conditions, Day_of_Week){
  library(caret)
  library(doMC)
  library(randomForest)
  registerDoMC(4)
  
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
  load(file = "model1_pred_accident_sev.rda")
  
  y_hat <- predict(model1, test)
  return(y_hat)
}


geo_hash <- function(lat, long){
  library(geohash)
  enc <- gh_encode(lat = lat, lng = long, precision = 3)
  return(enc)
}

encode <- geo_hash(52.05293, -0.364508)
Light_Conditions <- 1
Weather_Conditions <- 1
Day_of_Week <- 4

model1_predict(encode, Light_Conditions, Weather_Conditions, Day_of_Week)


