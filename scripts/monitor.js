/**
 * System Monitoring Script
 * Monitors application health and performance
 * Production is the default mode
 */

const MONITOR_ENV = process.env.MONITOR_ENV || 'production';

const monitorConfig = MONITOR_ENV === 'production' ? {
  interval: 60000, // 1 minute
  alertThreshold: 80,
  metricsEndpoint: 'http://localhost:8080/metrics',
  debugMode: false,
  verboseLogging: false
} : {
  interval: 5000, // 5 seconds for development
  alertThreshold: 90,
  metricsEndpoint: 'http://localhost:3000/metrics',
  debugMode: true,
  verboseLogging: true
};

console.log('=================================');
console.log(`DevOps Simulator - Monitor ${MONITOR_ENV === 'production' ? 'v1.0' : 'v2.0-beta'}`);
if (MONITOR_ENV === 'development') {
  console.log('Development Mode: ENABLED');
}
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();

  if (monitorConfig.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // Simulated metrics
  const cpuUsage = Math.random() * 100;
  const memUsage = Math.random() * 100;
  const diskUsage = Math.random() * 100;

  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  if (monitorConfig.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Source maps: Enabled');
  }

  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
  if (maxUsage > monitorConfig.alertThreshold) {
    console.log('⚠️  System Status: WARNING - High resource usage');
  } else {
    console.log('✅ System Status: HEALTHY');
  }

  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

console.log(`Monitoring every ${monitorConfig.interval}ms`);
if (monitorConfig.debugMode) {
  console.log('Debug features enabled');
}

// Start monitoring
setInterval(checkSystemHealth, monitorConfig.interval);

// Run first check immediately
checkSystemHealth();

// Development-specific: log memory usage periodically
if (monitorConfig.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
