/**
 * @fileOverview JavaScript Input Soal Library.
 * @author Balloon Pop Maths
 * @version 1.0.0
 */
/*jshint esversion: 6 */
/* globals $ */

// LocalStorage key for questions
const QUESTIONS_STORAGE_KEY = 'balloon_pop_questions';

/**
 * Get all questions from localStorage
 * @return {Array} Array of question objects
 */
function getQuestions() {
    try {
        const questionsJson = localStorage.getItem(QUESTIONS_STORAGE_KEY);
        return questionsJson ? JSON.parse(questionsJson) : [];
    } catch (error) {
        console.error('Error parsing questions from localStorage:', error);
        // If data is corrupted, reset to empty array
        localStorage.setItem(QUESTIONS_STORAGE_KEY, '[]');
        return [];
    }
}

/**
 * Save questions to localStorage
 * @param {Array} questions - Array of question objects
 */
function saveQuestions(questions) {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
}

/**
 * Add a new question
 * @param {Object} question - Question object with properties: question, answer, choices
 */
function addQuestion(question) {
    const questions = getQuestions();
    question.id = Date.now(); // Unique ID based on timestamp
    questions.push(question);
    saveQuestions(questions);
    displayQuestions();
}

/**
 * Delete a question by ID
 * @param {number} questionId - ID of the question to delete
 */
function deleteQuestion(questionId) {
    let questions = getQuestions();
    questions = questions.filter(q => q.id !== questionId);
    saveQuestions(questions);
    displayQuestions();
}

/**
 * Display all questions in the question list
 */
function displayQuestions() {
    const questions = getQuestions();
    const questionList = $('#question-list');
    const noQuestionsMessage = $('#no-questions-message');
    
    // Clear current list
    questionList.empty();
    
    if (questions.length === 0) {
        noQuestionsMessage.show();
        return;
    }
    
    noQuestionsMessage.hide();
    
    // Display each question
    questions.forEach((question, index) => {
        const questionHtml = `
            <div class="question-item" data-id="${question.id}">
                <div class="question-item-header">
                    <div class="question-number">Soal #${index + 1}</div>
                    <button class="question-delete-btn" onclick="deleteQuestionById(${question.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="question-text">
                    <strong>Pertanyaan:</strong> ${escapeHtml(question.question)}
                </div>
                <div class="question-answer">
                    <strong>Jawaban:</strong> ${escapeHtml(question.answer)}
                </div>
                ${question.choices && question.choices.length > 0 ? `
                    <div class="question-choices">
                        <strong>Pilihan Jawaban:</strong>
                        ${question.choices.map((choice, i) => `
                            <div>${String.fromCharCode(65 + i)}. ${escapeHtml(choice)}</div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        questionList.append(questionHtml);
    });
}

/**
 * Helper function to escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @return {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Delete question by ID (called from onclick)
 * @param {number} questionId - ID of question to delete
 */
function deleteQuestionById(questionId) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        deleteQuestion(questionId);
    }
}

/**
 * Show Input Soal section and hide other sections
 */
function showInputSoalSection() {
    // Hide other sections
    $('#heading-section').addClass('d-none');
    $('#options-section').addClass('d-none');
    $('#information-section').addClass('d-none');
    $('#game-section').addClass('d-none');
    
    // Show Input Soal section
    $('#input-soal-section').removeClass('d-none');
    
    // Load and display questions
    displayQuestions();
}

/**
 * Hide Input Soal section and show main menu
 */
function hideInputSoalSection() {
    // Show main sections
    $('#heading-section').removeClass('d-none');
    $('#options-section').removeClass('d-none');
    $('#information-section').removeClass('d-none');
    
    // Hide Input Soal section
    $('#input-soal-section').addClass('d-none');
}

/**
 * Show modal for adding question
 */
function showAddQuestionModal() {
    $('#modal-tambah-soal').addClass('modal_open');
}

/**
 * Hide modal for adding question
 */
function hideAddQuestionModal() {
    $('#modal-tambah-soal').removeClass('modal_open');
    // Reset form
    $('#form-tambah-soal')[0].reset();
}

/**
 * Handle form submission to add new question
 */
function handleAddQuestion(event) {
    event.preventDefault();
    
    // Get form values
    const question = $('#input-pertanyaan').val().trim();
    const answer = $('#input-jawaban').val().trim();
    const choices = [
        $('#input-pilihan-1').val().trim(),
        $('#input-pilihan-2').val().trim(),
        $('#input-pilihan-3').val().trim(),
        $('#input-pilihan-4').val().trim()
    ].filter(choice => choice !== ''); // Remove empty choices
    
    // Validate
    if (!question || !answer) {
        alert('Pertanyaan dan jawaban harus diisi!');
        return;
    }
    
    // Create question object
    const questionObj = {
        question: question,
        answer: answer,
        choices: choices
    };
    
    // Add question
    addQuestion(questionObj);
    
    // Hide modal
    hideAddQuestionModal();
    
    // Show success message
    alert('Soal berhasil ditambahkan!');
}

// Event Handlers - will be initialized when document is ready
$(document).ready(function() {
    // Button to show Input Soal section
    $('#btn-input-soal').on('click', showInputSoalSection);
    
    // Button to return to main menu from Input Soal section
    $('#btn-input-soal-home').on('click', hideInputSoalSection);
    
    // Button to show add question modal
    $('#btn-tambah-soal').on('click', showAddQuestionModal);
    
    // Button to cancel/close modal
    $('#btn-batal-tambah').on('click', hideAddQuestionModal);
    
    // Form submission
    $('#form-tambah-soal').on('submit', handleAddQuestion);
    
    // Close modal when clicking outside
    $('#modal-tambah-soal').on('click', function(e) {
        if (e.target.id === 'modal-tambah-soal') {
            hideAddQuestionModal();
        }
    });
});
