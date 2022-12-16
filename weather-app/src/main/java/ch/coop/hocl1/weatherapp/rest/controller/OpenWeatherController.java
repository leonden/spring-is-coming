package ch.coop.hocl1.weatherapp.rest.controller;

import ch.coop.hocl1.weatherapp.dao.OpenWeatherDao;
import ch.coop.hocl1.weatherapp.models.geocoder.GeoLocation;
import ch.coop.hocl1.weatherapp.models.openweather.ForecastModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/weather")
public class OpenWeatherController {

    @Autowired
    private OpenWeatherDao openWeatherDao;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/forecast",
            produces = { "application/json", "text/html"}
    )
    public ResponseEntity<List<GeoLocation>> readForecast(double latitude, double longitude,  String clockTime) {
        // TODO parse the clockTime String to a LocalTime

        List<ForecastModel> searchResult = openWeatherDao.readForecast(latitude, longitude);

        // TODO handle clocktime later


        return new ResponseEntity<>(Collections.EMPTY_LIST, HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/current-weather",
            produces = { "application/json", "text/html"}
    )
    public ResponseEntity<List<GeoLocation>> readCurrentWeather(String query) {
        System.out.println("Hello " + query);


        //List<ForecastModel> searchResult = openWeatherDao.readGeoLocation(query);

        return new ResponseEntity<>(Collections.EMPTY_LIST, HttpStatus.OK);
    }

}
