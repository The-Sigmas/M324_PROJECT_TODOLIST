FROM maven:3.8.6-openjdk-18-slim AS build
COPY src /tmp/src
COPY pom.xml /tmp
RUN mvn -f /tmp/pom.xml clean test package

FROM openjdk:18-jdk-alpine
COPY --from=build /tmp/target/*.jar demo-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo-0.0.1-SNAPSHOT.jar"]
