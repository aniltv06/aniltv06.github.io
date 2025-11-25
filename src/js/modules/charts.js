/**
 * Charts Module (Simplified)
 * Charts will be loaded lazily when Chart.js loads
 */

import { loadScript } from './utils.js';
import { CDN_URLS } from '../config/constants.js';

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

  new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Swift', 'AI/ML', 'Architecture', 'Performance', 'Leadership', 'CI/CD', 'Security', 'Cross-Platform'],
      datasets: [{
        label: 'Expertise Level',
        data: [95, 90, 92, 88, 85, 87, 83, 90],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}

function createPerformanceChart() {
  const canvas = document.getElementById('performanceChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['App Launch', 'Memory Usage', 'Battery Impact', 'Network Efficiency'],
      datasets: [{
        label: 'Performance Improvement (%)',
        data: [40, 35, 50, 45],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}

function createAdoptionChart() {
  const canvas = document.getElementById('adoptionChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      datasets: [{
        label: 'Feature Adoption (%)',
        data: [15, 35, 60, 75, 85, 92],
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}
