package com.ecommerce.config;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;
    
    @Value("${allowed.origins}")
    private String[] allowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String basePath;
    
    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    /**
     * Read Only approach
     *
     * @param config
     * @param cors
     */
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnSupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        
        // disable HTTP methods for Entity Classes: PUT, POST and DELETE
        disableHttpMethods(ProductCategory.class, config, theUnSupportedActions);
        disableHttpMethods(Product.class, config, theUnSupportedActions);
        disableHttpMethods(Country.class, config, theUnSupportedActions);
        disableHttpMethods(State.class, config, theUnSupportedActions);

        // call an internal helper method
        exposeIds(config);
        
        //cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
        //cors.addMapping("/api/**").allowedOrigins(allowedOrigins);
        cors.addMapping(config.getBasePath()+ "/**").allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class theEntityClass, RepositoryRestConfiguration config, HttpMethod[] theUnSupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theEntityClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnSupportedActions));
    }

    // developed method to expose the IDs
    // spring-data-rest don't expose IDs for objs by default
    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity IDs

        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // get the entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // expose the entity IDs for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }

}
