/**
 * Charts Module (Simplified)
 * Charts will be loaded lazily when Chart.js loads
 */

import { loadScript } from './utils.js';
import { CDN_URLS } from '../config/constants.js';

let chartInstances = {
  skillsRadar: null,
  performanceChart: null,
  adoptionChart: null,
};

// Get theme-aware colors for charts
function getThemeColors() {
  const theme = document.body.dataset.theme || 'light';

  if (theme === 'terminal') {
    return {
      primary: '#00ff41',
      secondary: '#39ff14',
      background: 'rgba(0, 255, 65, 0.2)',
      text: '#00ff41',
      grid: 'rgba(0, 255, 65, 0.2)',
      tick: '#00ff41',
    };
  } else if (theme === 'dark') {
    return {
      primary: '#60a5fa',
      secondary: '#2563eb',
      background: 'rgba(96, 165, 250, 0.2)',
      text: '#f8fafc',
      grid: 'rgba(255, 255, 255, 0.1)',
      tick: '#f8fafc',
    };
  } else {
    return {
      primary: '#2563eb',
      secondary: '#60a5fa',
      background: 'rgba(37, 99, 235, 0.2)',
      text: '#333',
      grid: 'rgba(0, 0, 0, 0.1)',
      tick: '#333',
    };
  }
}

export async function initCharts() {
  // Show loading state on all chart containers
  const chartContainers = [
    document.querySelector('.skills-radar-container'),
    ...document.querySelectorAll('.dashboard-card__chart-container')
  ];

  chartContainers.forEach(container => {
    if (container) container.setAttribute('data-loading', 'true');
  });

  // Load Chart.js
  const loaded = await loadScript(CDN_URLS.CHART_JS);
  if (!loaded || typeof Chart === 'undefined') {
    console.warn('Chart.js failed to load');
    // Remove loading state on failure
    chartContainers.forEach(container => {
      if (container) container.removeAttribute('data-loading');
    });
    return;
  }

  // Create charts
  createSkillsRadar();
  createPerformanceChart();
  createAdoptionChart();

  // Remove loading state after charts are created
  setTimeout(() => {
    chartContainers.forEach(container => {
      if (container) container.removeAttribute('data-loading');
    });
  }, 100);
}

function createSkillsRadar() {
  const canvas = document.getElementById('skillsRadar');
  if (!canvas) return;

  const colors = getThemeColors();

  // Destroy existing chart if it exists
  if (chartInstances.skillsRadar) {
    chartInstances.skillsRadar.destroy();
  }

  chartInstances.skillsRadar = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Swift', 'AI/ML', 'Architecture', 'Performance', 'Leadership', 'CI/CD', 'Security', 'Cross-Platform'],
      datasets: [{
        label: 'Expertise Level',
        data: [95, 90, 92, 88, 85, 87, 83, 90],
        backgroundColor: colors.background,
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.primary,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: colors.text,
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            backdropColor: 'transparent',
            color: colors.tick,
            font: {
              size: 12,
            }
          },
          pointLabels: {
            color: colors.text,
            font: {
              size: 13,
            }
          },
          grid: {
            color: colors.grid,
          },
          angleLines: {
            color: colors.grid,
          }
        },
      },
    },
  });
}

function createPerformanceChart() {
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;

  const colors = getThemeColors();

  // Destroy existing chart if it exists
  if (chartInstances.performanceChart) {
    chartInstances.performanceChart.destroy();
  }

  chartInstances.performanceChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['App Launch', 'Memory Usage', 'Battery Impact', 'Network Efficiency'],
      datasets: [{
        label: 'Performance Improvement (%)',
        data: [40, 35, 50, 45],
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: colors.text,
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: colors.tick,
          },
          grid: {
            color: colors.grid,
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: colors.tick,
          },
          grid: {
            color: colors.grid,
          }
        },
      },
    },
  });
}

function createAdoptionChart() {
  const canvas = document.getElementById('adoptionChart');
  if (!canvas) return;

  const colors = getThemeColors();

  // Destroy existing chart if it exists
  if (chartInstances.adoptionChart) {
    chartInstances.adoptionChart.destroy();
  }

  chartInstances.adoptionChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      datasets: [{
        label: 'Feature Adoption (%)',
        data: [15, 35, 60, 75, 85, 92],
        borderColor: colors.primary,
        backgroundColor: colors.background,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.primary,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: colors.text,
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: colors.tick,
          },
          grid: {
            color: colors.grid,
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: colors.tick,
          },
          grid: {
            color: colors.grid,
          }
        },
      },
    },
  });
}

/**
 * Update charts when theme changes
 */
export function updateChartsTheme() {
  if (typeof Chart === 'undefined') return;

  createSkillsRadar();
  createPerformanceChart();
  createAdoptionChart();
}
