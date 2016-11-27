package com.team.soinve.listener;


import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class SpringBeansListener implements ServletContextListener {

	private static ApplicationContext applicationContext = null;

	private static Logger logger = Logger.getLogger(SpringBeansListener.class);

	public void contextDestroyed(ServletContextEvent event) {

		if (logger.isInfoEnabled()) {
			logger.info("SpringBeansListener is destroyed");
		}

	}

	public void contextInitialized(ServletContextEvent event) {

		ServletContext servletContext = event.getServletContext();

		if (null == applicationContext) {
			applicationContext = WebApplicationContextUtils
					.getWebApplicationContext(servletContext);
		}

		if (logger.isInfoEnabled()) {
			logger.info("SpringBeansListener is initialized");
		}

	}

	public static synchronized ApplicationContext getApplicationContext() {
		return applicationContext;
	}
}
