package ch.coop.hocl1.weatherapp.dao.impl;

import ch.coop.hocl1.weatherapp.dao.GeocoderDao;
import ch.coop.hocl1.weatherapp.models.geocoder.GeoLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeocoderDaoImpl implements GeocoderDao {

    @Autowired
    private Environment environment;

    @Override
    public List<GeoLocation> readGeoLocation(String query) {
        String baseUrl = environment.getProperty("geocoder.base.url");
        String apiKey = environment.getProperty("geocoder.api.key");

        return null;
    }
}
