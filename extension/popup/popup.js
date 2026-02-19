// TOS Report Card - Popup Logic v1.1

const API_URL = 'https://lucky-haze-c570.tosreportcard.workers.dev/api';

let currentAnalysis = null;
let currentTab = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTab = tab;
  
  if (isTOSPage(tab.url)) {
    // Automatically analyze current page
    analyzeURL(tab.url);
  } else {
    // Show manual input
    showManualInput();
  }
  
  // Set up event listeners
  setupEventListeners();
});

// Check if URL looks like a TOS page
function isTOSPage(url) {
  const TOS_PATTERNS = [
    /terms[-_]of[-_](service|use)/i,
    /privacy[-_]policy/i,
    /user[-_]agreement/i,
    /acceptable[-_]use/i,
    /\/tos\b/i,
    /\/terms\b/i,
    /\/privacy\b/i,
    /\/legal\b/i,
    /\/eula\b/i
  ];
  
  return TOS_PATTERNS.some(pattern => pattern.test(url));
}

// Analyze URL
async function analyzeURL(url) {
  showLoading();
  
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle specific error types
      if (data.suggestion === 'analyze_visible_content') {
        // Offer text-based analysis as fallback
        showAuthError(data.message, url);
      } else {
        showError(data.message || 'Unable to analyze this page.');
      }
      return;
    }
    
    currentAnalysis = data;
    displayResults(data);
    
  } catch (error) {
    console.error('Analysis error:', error);
    showError('Unable to analyze this page. Please check your internet connection and try again.');
  }
}

// NEW: Analyze page text directly (for auth-required pages)
async function analyzePageText() {
  showLoading();
  
  try {
    // Extract text from current page
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageText
    });
    
    const pageText = results[0].result;
    
    if (!pageText || pageText.length < 100) {
      showError('Unable to extract enough content from this page to analyze.');
      return;
    }
    
    // Send text to API
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        text: pageText,
        url: tab.url 
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError(data.message || 'Unable to analyze this content.');
      return;
    }
    
    currentAnalysis = data;
    displayResults(data);
    
  } catch (error) {
    console.error('Text analysis error:', error);
    showError('Unable to analyze page content. Please try manual URL input instead.');
  }
}

// Function that runs in page context to extract text
function extractPageText() {
  return document.body.innerText.substring(0, 80000);
}

// Show loading state
function showLoading() {
  hideAllStates();
  document.getElementById('loading-state').style.display = 'block';
}

// Show error state
function showError(message) {
  hideAllStates();
  document.getElementById('error-state').style.display = 'block';
  document.getElementById('error-message').textContent = message;
}

// NEW: Show auth error with text analysis option
function showAuthError(message, url) {
  hideAllStates();
  const errorState = document.getElementById('error-state');
  errorState.style.display = 'block';
  
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerHTML = `
    <p>${message}</p>
    <p style="margin-top: 12px;">Would you like to analyze the visible content on this page instead?</p>
  `;
  
  // Change button to offer text analysis
  const tryButton = document.getElementById('btn-try-manual');
  tryButton.textContent = 'Analyze This Page';
  tryButton.onclick = () => {
    analyzePageText();
  };
  
  // Add manual input as secondary option
  const manualButton = document.createElement('button');
  manualButton.textContent = 'Enter URL Manually';
  manualButton.className = 'btn-secondary';
  manualButton.style.marginTop = '8px';
  manualButton.onclick = showManualInput;
  errorMessage.appendChild(manualButton);
}

// Show results state
function displayResults(analysis) {
  hideAllStates();
  document.getElementById('results-state').style.display = 'block';
  
  // Page info
  document.getElementById('page-url').textContent = analysis.url;
  
  const analyzedDate = new Date(analysis.analyzed_at);
  const verifiedDate = analysis.content_verified_at ? new Date(analysis.content_verified_at) : null;
  
  let metaText = `Analyzed: ${formatDate(analyzedDate)}`;
  if (analysis.cached && verifiedDate) {
    metaText += ` • Verified: ${formatRelativeTime(verifiedDate)}`;
  }
  document.getElementById('page-meta').textContent = metaText;
  
  // Grade
  const gradeLetter = analysis.grade;
  const gradeElement = document.getElementById('grade-letter');
  gradeElement.textContent = gradeLetter;
  gradeElement.className = `grade-letter grade-${gradeLetter.toLowerCase()}`;
  
  document.getElementById('grade-score').textContent = `${analysis.numeric_score}/100`;
  document.getElementById('grade-label').textContent = `Grade ${gradeLetter} - ${getGradeLabel(gradeLetter)}`;
  document.getElementById('grade-description').textContent = getGradeDescription(gradeLetter);
  
  // Summary
  document.getElementById('summary-text').textContent = analysis.summary;
  
  // Red flags
  if (analysis.red_flags && analysis.red_flags.length > 0) {
    document.getElementById('red-flags-section').style.display = 'block';
    document.getElementById('red-flags-count').textContent = `(${analysis.red_flags.length})`;
    
    const flagsList = document.getElementById('red-flags-list');
    flagsList.innerHTML = '';
    analysis.red_flags.forEach(flag => {
      const li = document.createElement('li');
      li.textContent = flag;
      flagsList.appendChild(li);
    });
  } else {
    document.getElementById('red-flags-section').style.display = 'none';
  }
  
  // Highlights
  if (analysis.highlights && analysis.highlights.length > 0) {
    document.getElementById('highlights-section').style.display = 'block';
    document.getElementById('highlights-count').textContent = `(${analysis.highlights.length})`;
    
    const highlightsList = document.getElementById('highlights-list');
    highlightsList.innerHTML = '';
    analysis.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      highlightsList.appendChild(li);
    });
  } else {
    document.getElementById('highlights-section').style.display = 'none';
  }
}

// Show manual input state
function showManualInput() {
  hideAllStates();
  document.getElementById('manual-input-state').style.display = 'block';
}

// Hide all states
function hideAllStates() {
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('results-state').style.display = 'none';
  document.getElementById('manual-input-state').style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
  // Feedback buttons
  document.getElementById('btn-helpful-yes').addEventListener('click', () => {
    submitFeedback(true);
  });
  
  document.getElementById('btn-helpful-no').addEventListener('click', () => {
    submitFeedback(false);
  });
  
  document.getElementById('btn-feedback-skip').addEventListener('click', () => {
    hideFeedbackButtons();
  });
  
  // Action buttons
  // PDF export temporarily disabled for Chrome Web Store compliance
  // document.getElementById('btn-export-pdf').addEventListener('click', exportToPDF);
  document.getElementById('btn-analyze-url').addEventListener('click', showManualInput);
  
  // Manual input buttons
  document.getElementById('btn-manual-analyze').addEventListener('click', async () => {
    const url = document.getElementById('manual-url-input').value.trim();
    if (url) {
      await analyzeURL(url);
    }
  });
  
  document.getElementById('btn-manual-cancel').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (isTOSPage(tab.url)) {
      analyzeURL(tab.url);
    } else {
      showManualInput();
    }
  });
  
  // Enter key in URL input
  document.getElementById('manual-url-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-manual-analyze').click();
    }
  });
  
  // Error state button
  document.getElementById('btn-try-manual').addEventListener('click', showManualInput);
}

// Submit feedback
async function submitFeedback(helpful) {
  if (!currentAnalysis) return;
  
  const feedbackData = {
    analysis_id: currentAnalysis.content_hash,
    url: currentAnalysis.url,
    grade: currentAnalysis.grade,
    helpful: helpful,
    timestamp: new Date().toISOString()
  };
  
  try {
    await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    });
    
    showFeedbackThanks();
  } catch (error) {
    console.error('Feedback submission error:', error);
    // Still show thanks even if submission failed
    showFeedbackThanks();
  }
}

// Show feedback thanks
function showFeedbackThanks() {
  document.querySelector('.feedback-buttons').style.display = 'none';
  document.querySelector('.feedback-prompt').style.display = 'none';
  document.getElementById('feedback-thanks').style.display = 'block';
}

// Hide feedback buttons
function hideFeedbackButtons() {
  document.querySelector('.feedback-section').style.display = 'none';
}

// Export to PDF
function exportToPDF() {
  if (!currentAnalysis) return;
  
  try {
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPos = margin;
    
    // Header with logo area
    doc.setFillColor(124, 58, 237); // Purple
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('TOS REPORT CARD', margin, 22);
    
    yPos = 50;
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // URL
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('URL:', margin, yPos);
    yPos += 5;
    
    doc.setFontSize(9);
    const urlLines = doc.splitTextToSize(currentAnalysis.url || 'N/A', maxWidth);
    doc.text(urlLines, margin, yPos);
    yPos += (urlLines.length * 4) + 8;
    
    // Date
    doc.setFontSize(9);
    const analyzedDate = new Date(currentAnalysis.analyzed_at).toLocaleDateString();
    doc.text(`Analyzed: ${analyzedDate}`, margin, yPos);
    yPos += 12;
    
    // Grade Box
    const gradeBoxY = yPos;
    doc.setFillColor(249, 250, 251); // Light gray
    doc.roundedRect(margin, gradeBoxY, maxWidth, 25, 3, 3, 'F');
    
    // Grade letter with color
    const gradeColors = {
      'A': [20, 184, 166],   // Teal
      'B': [20, 184, 166],   // Teal
      'C': [245, 158, 11],   // Amber
      'D': [249, 115, 22],   // Orange
      'F': [239, 68, 68]     // Red
    };
    
    const gradeColor = gradeColors[currentAnalysis.grade] || [0, 0, 0];
    doc.setTextColor(...gradeColor);
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text(`Grade ${currentAnalysis.grade}`, margin + 5, gradeBoxY + 18);
    
    // Numeric score
    doc.setTextColor(107, 114, 128); // Gray
    doc.setFontSize(12);
    doc.text(`${currentAnalysis.numeric_score}/100`, pageWidth - margin - 25, gradeBoxY + 18);
    
    yPos = gradeBoxY + 35;
    
    // Summary
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('SUMMARY', margin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const summaryLines = doc.splitTextToSize(currentAnalysis.summary, maxWidth);
    doc.text(summaryLines, margin, yPos);
    yPos += (summaryLines.length * 5) + 10;
    
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = margin;
    }
    
    // Red Flags
    if (currentAnalysis.red_flags && currentAnalysis.red_flags.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(239, 68, 68); // Red
      doc.text(`RED FLAGS (${currentAnalysis.red_flags.length})`, margin, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      
      currentAnalysis.red_flags.forEach((flag, index) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = margin;
        }
        
        const flagLines = doc.splitTextToSize(`${index + 1}. ${flag}`, maxWidth - 5);
        doc.text(flagLines, margin + 5, yPos);
        yPos += (flagLines.length * 5) + 3;
      });
      
      yPos += 7;
    }
    
    // Highlights
    if (currentAnalysis.highlights && currentAnalysis.highlights.length > 0) {
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(20, 184, 166); // Teal
      doc.text(`HIGHLIGHTS (${currentAnalysis.highlights.length})`, margin, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      
      currentAnalysis.highlights.forEach((highlight, index) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = margin;
        }
        
        const highlightLines = doc.splitTextToSize(`${index + 1}. ${highlight}`, maxWidth - 5);
        doc.text(highlightLines, margin + 5, yPos);
        yPos += (highlightLines.length * 5) + 3;
      });
    }
    
    // Footer on last page
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175); // Gray
      doc.text(
        `Generated by TOS Report Card • tosreportcard.com • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    // Save the PDF
    const domain = currentAnalysis.url ? new URL(currentAnalysis.url).hostname : 'analysis';
    const sanitizedDomain = domain.replace(/[^a-z0-9]/gi, '-');
    const timestamp = new Date().toISOString().split('T')[0];
    doc.save(`tos-report-card-${sanitizedDomain}-${timestamp}.pdf`);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback to text export if PDF fails
    exportToText();
  }
}

// Fallback text export if PDF fails
function exportToText() {
  if (!currentAnalysis) return;
  
  let textContent = `TOS REPORT CARD\n\n`;
  textContent += `URL: ${currentAnalysis.url}\n`;
  textContent += `Analyzed: ${new Date(currentAnalysis.analyzed_at).toLocaleDateString()}\n\n`;
  textContent += `GRADE: ${currentAnalysis.grade} (${currentAnalysis.numeric_score}/100)\n\n`;
  textContent += `SUMMARY:\n${currentAnalysis.summary}\n\n`;
  
  if (currentAnalysis.red_flags && currentAnalysis.red_flags.length > 0) {
    textContent += `RED FLAGS:\n`;
    currentAnalysis.red_flags.forEach((flag, i) => {
      textContent += `${i + 1}. ${flag}\n`;
    });
    textContent += `\n`;
  }
  
  if (currentAnalysis.highlights && currentAnalysis.highlights.length > 0) {
    textContent += `HIGHLIGHTS:\n`;
    currentAnalysis.highlights.forEach((highlight, i) => {
      textContent += `${i + 1}. ${highlight}\n`;
    });
    textContent += `\n`;
  }
  
  textContent += `\n---\nGenerated by TOS Report Card\ntosreportcard.com`;
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tos-analysis-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Helper functions
function getGradeLabel(grade) {
  const labels = {
    'A': 'Exemplary',
    'B': 'Good',
    'C': 'Acceptable',
    'D': 'Poor',
    'F': 'Failing'
  };
  return labels[grade] || 'Unknown';
}

function getGradeDescription(grade) {
  const descriptions = {
    'A': 'Sets industry standard for user rights',
    'B': 'Fair terms with minor concerns',
    'C': 'Standard practice with notable issues',
    'D': 'Multiple red flags favor company',
    'F': 'Predatory or deceptive terms'
  };
  return descriptions[grade] || '';
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function formatRelativeTime(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return formatDate(date);
}
