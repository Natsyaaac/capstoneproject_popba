/**
 * @fileOverview Firebase Configuration and Utilities
 * @description Setup Firebase for image storage in Balloon Pop Maths Visual Mode
 * @version 1.0.0
 */
/*jshint esversion: 8 */

let firebaseApp = null;
let firebaseStorage = null;
let firebaseInitialized = false;

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

function isFirebaseConfigured() {
    return firebaseConfig.apiKey && 
           firebaseConfig.storageBucket && 
           firebaseConfig.projectId;
}

async function initializeFirebase() {
    if (firebaseInitialized) return true;
    
    if (!isFirebaseConfigured()) {
        console.warn('⚠️ Firebase not configured. Visual questions will use local storage only.');
        return false;
    }
    
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
        const { getStorage } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js');
        
        firebaseApp = initializeApp(firebaseConfig);
        firebaseStorage = getStorage(firebaseApp);
        firebaseInitialized = true;
        
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        return false;
    }
}

async function uploadImageToFirebase(file, questionId) {
    if (!firebaseInitialized) {
        const initialized = await initializeFirebase();
        if (!initialized) {
            console.log('📦 Using local storage for image (Firebase not available)');
            return null;
        }
    }
    
    try {
        const { ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js');
        
        const timestamp = Date.now();
        const fileName = `visual-questions/${questionId}_${timestamp}_${file.name}`;
        const storageRef = ref(firebaseStorage, fileName);
        
        const metadata = {
            contentType: file.type,
            customMetadata: {
                'questionId': questionId.toString(),
                'uploadedAt': new Date().toISOString()
            }
        };
        
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        console.log('✅ Image uploaded to Firebase:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('❌ Firebase upload failed:', error);
        return null;
    }
}

async function deleteImageFromFirebase(imageUrl) {
    if (!firebaseInitialized || !imageUrl || !imageUrl.includes('firebase')) {
        return false;
    }
    
    try {
        const { ref, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js');
        
        const urlPath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
        const imageRef = ref(firebaseStorage, urlPath);
        
        await deleteObject(imageRef);
        console.log('✅ Image deleted from Firebase');
        return true;
    } catch (error) {
        console.error('❌ Firebase delete failed:', error);
        return false;
    }
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.'
        };
    }
    
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'Ukuran file terlalu besar. Maksimal 5MB.'
        };
    }
    
    return { valid: true };
}

window.firebaseUtils = {
    initializeFirebase,
    uploadImageToFirebase,
    deleteImageFromFirebase,
    convertFileToBase64,
    validateImageFile,
    isFirebaseConfigured
};
