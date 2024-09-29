// Function to measure loading metrics
const measureLoadingMetrics = () => {
    const performanceData = window.performance;
    const timing = performanceData.timing;
  
    const loadTime = timing.loadEventEnd - timing.navigationStart; // Keep in milliseconds
    const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart; // Keep in milliseconds
    const ttfb = timing.responseStart - timing.navigationStart; // Keep in milliseconds
    const imageLoadTime = (performanceData.getEntriesByType('resource').filter(entry => entry.initiatorType === 'img')
      .reduce((total, entry) => total + (entry.responseEnd - entry.startTime), 0) || 0); // Keep in milliseconds
    const cssLoadTime = (performanceData.getEntriesByType('resource').filter(entry => entry.initiatorType === 'css')
      .reduce((total, entry) => total + (entry.responseEnd - entry.startTime), 0) || 0); // Keep in milliseconds
    const jsLoadTime = (performanceData.getEntriesByType('resource').filter(entry => entry.initiatorType === 'script')
      .reduce((total, entry) => total + (entry.responseEnd - entry.startTime), 0) || 0); // Keep in milliseconds
  
    const firstPaint = performanceData.getEntriesByType('paint')[0]?.startTime || 0; // Keep in milliseconds
    const firstContentfulPaint = performanceData.getEntriesByType('paint')[1]?.startTime || 0; // Keep in milliseconds
    const largestContentfulPaint = performanceData.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0; // Keep in milliseconds
    const cls = performanceData.getEntriesByType('layout-shift').reduce((total, entry) => total + entry.value, 0); // Cumulative Layout Shift
    const totalBlockingTime = firstContentfulPaint - timing.domContentLoadedEventEnd; // Keep in milliseconds
    const speedIndex = performanceData.getEntriesByType('paint')[0]?.startTime || 0; // Approximation of Speed Index
  
    return {
      loadTime,
      domContentLoadedTime,
      ttfb,
      imageLoadTime,
      cssLoadTime,
      jsLoadTime,
      firstPaint,
      firstContentfulPaint,
      largestContentfulPaint,
      cls,
      totalBlockingTime,
      speedIndex,
    };
  };
  
  // Create overlay to display metrics
  const createOverlay = (metrics) => {
    // Create overlay for the whole webpage
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Black overlay with 0.4 opacity
    overlay.style.zIndex = 9998; // Ensure it's behind the dialog box
    document.body.appendChild(overlay);
  
    // Create the dialog box
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '20px';
    dialog.style.right = '20px';
    dialog.style.backgroundColor = 'yellow'; // Yellow dialog box
    dialog.style.padding = '15px';
    dialog.style.border = '1px solid #ccc';
    dialog.style.zIndex = 9999; // Ensure it's on top of the overlay
    dialog.innerHTML = `
      <h4>Page Metrics</h4>
      <p><strong>Page Load Time:</strong> ${metrics.loadTime.toFixed(2)} ms</p>
      <p><strong>DOM Content Loaded Time:</strong> ${metrics.domContentLoadedTime.toFixed(2)} ms</p>
      <p><strong>Time to First Byte (TTFB):</strong> ${metrics.ttfb.toFixed(2)} ms</p>
      <p><strong>Image Load Time:</strong> ${metrics.imageLoadTime.toFixed(2)} ms</p>
      <p><strong>CSS Load Time:</strong> ${metrics.cssLoadTime.toFixed(2)} ms</p>
      <p><strong>JavaScript Load Time:</strong> ${metrics.jsLoadTime.toFixed(2)} ms</p>
      <p><strong>First Paint Time:</strong> ${metrics.firstPaint.toFixed(2)} ms</p>
      <p><strong>First Contentful Paint Time:</strong> ${metrics.firstContentfulPaint.toFixed(2)} ms</p>
      <p><strong>Largest Contentful Paint Time:</strong> ${metrics.largestContentfulPaint.toFixed(2)} ms</p>
      <p><strong>Cumulative Layout Shift (CLS):</strong> ${metrics.cls.toFixed(2)}</p>
      <p><strong>Total Blocking Time:</strong> ${metrics.totalBlockingTime.toFixed(2)} ms</p>
      <p><strong>Speed Index (Approx):</strong> ${metrics.speedIndex.toFixed(2)} ms</p>
    `;
    document.body.appendChild(dialog);
  };
  
  // Measure and display metrics
  const metrics = measureLoadingMetrics();
  createOverlay(metrics);
  