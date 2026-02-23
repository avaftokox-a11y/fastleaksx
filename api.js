// api.js - cała logika i komunikacja z chmurą

// ==================== KONFIGURACJA ====================
const BIN_ID = '699b66ea43b1c97be9947e2f';
const API_KEY = '$2a$10$RjWg9.uyQvQcCa9ZYTAMhuEuljziWE3FW8Fr462VCzkw3zCjntw1C';
const ADMIN_PASSWORD = 'ltcadmin2024';

// ==================== DANE GLOBALNE ====================
let files = [];
let licenses = [];
let currentUserKey = null;
let currentLicense = null;
let isAdminLogged = false;
let uploadedFile = null;
let selectedDuration = 30;

// ==================== POMOCNICZE ====================
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showStatus(message, type = 'info', elementId = 'uploadStatus') {
    let el = document.getElementById(elementId);
    if (!el) return;
    
    el.textContent = message;
    el.style.color = type === 'success' ? '#8aff8a' : type === 'error' ? '#ff8a8a' : '#888';
    
    if (type !== 'error') {
        setTimeout(() => el.textContent = '', 3000);
    }
}

// ==================== BAZA DANYCH ====================
async function loadData() {
    try {
        let res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { 
                'X-Master-Key': API_KEY,
                'X-Bin-Meta': false
            }
        });
        
        if (!res.ok) throw new Error('błąd ładowania');
        
        let data = await res.json();
        
        files = data.files || [];
        licenses = data.licenses || [];
        
        updateUI();
        
        if (currentUserKey) {
            checkLicense();
            renderFiles();
        }
        
        showStatus('✅ dane załadowane', 'success');
        
    } catch (e) {
        console.log('błąd ładowania:', e);
        showStatus('⚠️ problem z ładowaniem danych', 'error');
    }
}

async function saveData() {
    try {
        // walidacja i czyszczenie danych
        let cleanFiles = files.map(f => ({
            id: String(f.id || Date.now()),
            name: String(f.name || 'bez_nazwy'),
            desc: String(f.desc || ''),
            size: Number(f.size) || 0,
            date: String(f.date || new Date().toISOString()),
            data: String(f.data || '')
        }));

        let cleanLicenses = licenses.map(l => ({
            key: String(l.key || ''),
            name: String(l.name || ''),
            created: String(l.created || new Date().toISOString().split('T')[0]),
            expires: String(l.expires || ''),
            duration: Number(l.duration) || 30
        }));

        let data = { 
            files: cleanFiles, 
            licenses: cleanLicenses,
            lastUpdate: new Date().toISOString()
        };

        let res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('błąd zapisu');
        
        console.log(`✅ zapisano: ${cleanFiles.length} plików, ${cleanLicenses.length} kluczy`);
        showStatus('✅ zapisano w chmurze', 'success');
        
    } catch (e) {
        console.log('błąd zapisu:', e);
        showStatus('❌ błąd zapisu', 'error');
    }
    
    updateUI();
}

function updateUI() {
    // statystyki admin
    document.getElementById('adminFilesCount').textContent = files.length;
    document.getElementById('adminKeysCount').textContent = licenses.length;
    
    let totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);
    let sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    document.getElementById('adminTotalSize').textContent = sizeMB + ' MB';
    
    // statystyki user
    document.getElementById('totalFiles').textContent = files.length;
    document.getElementById('totalSize').textContent = sizeMB + ' MB';
    
    if (files.length > 0) {
        let last = new Date(files[0].date).toLocaleString('pl-PL');
        document.getElementById('lastUpdate').textContent = last;
    }

    if (isAdminLogged) {
        renderKeys();
        renderAdminFiles();
    }
}

// ==================== PRZEŁĄCZANIE ZAKŁADEK ====================
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    
    if (tab === 'user') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('userPanel').classList.add('active');
    } else {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('adminPanel').classList.add('active');
    }
}

// ==================== UŻYTKOWNIK ====================
function userLogin() {
    let key = escapeHTML(document.getElementById('userKeyInput').value.toUpperCase());
    if (!key) return alert('wpisz klucz');
    
    let valid = licenses.find(l => l.key === key);
    if (!valid) return alert('zły klucz');
    
    let now = new Date();
    let expiry = new Date(valid.expires);
    
    if (now > expiry) return alert('klucz wygasł');
    
    currentUserKey = key;
    currentLicense = valid;
    
    document.getElementById('userLoginPanel').style.display = 'none';
    document.getElementById('userFilesPanel').style.display = 'block';
    document.getElementById('userDisplayKey').textContent = '•'.repeat(key.length);
    
    updateLicenseBadge();
    renderFiles();
}

function userLogout() {
    currentUserKey = null;
    currentLicense = null;
    document.getElementById('userLoginPanel').style.display = 'block';
    document.getElementById('userFilesPanel').style.display = 'none';
}

function checkLicense() {
    if (!currentLicense) return;
    let now = new Date();
    let expiry = new Date(currentLicense.expires);
    if (now > expiry) {
        alert('klucz wygasł');
        userLogout();
    } else {
        updateLicenseBadge();
    }
}

function updateLicenseBadge() {
    let badge = document.getElementById('licenseBadge');
    let now = new Date();
    let expiry = new Date(currentLicense.expires);
    let daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    
    badge.className = 'license-status';
    if (daysLeft <= 3) {
        badge.classList.add('expiring');
        badge.textContent = `⚠️ wygasa za ${daysLeft} dni`;
    } else {
        badge.classList.add('active');
        badge.textContent = `✅ aktywna (${daysLeft} dni)`;
    }
}

function filterFiles() {
    renderFiles();
}

function renderFiles() {
    let grid = document.getElementById('filesGrid');
    let search = document.getElementById('searchFiles')?.value.toLowerCase() || '';
    
    if (!files.length) {
        grid.innerHTML = '<div class="empty-state">📁 brak plików</div>';
        return;
    }

    let filtered = files.filter(f => 
        f.name.toLowerCase().includes(search) || 
        (f.desc || '').toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">🔍 nie znaleziono</div>';
        return;
    }

    let html = '';
    filtered.forEach(f => {
        let size = (f.size / 1024).toFixed(2) + ' KB';
        if (f.size > 1024*1024) size = (f.size / (1024*1024)).toFixed(2) + ' MB';
        
        html += `
            <div class="file-item">
                <div class="file-name">${escapeHTML(f.name)}</div>
                <div class="file-meta">${size} • ${new Date(f.date).toLocaleDateString('pl-PL')}</div>
                <div class="file-actions">
                    <button class="small success" onclick="downloadFile('${escapeHTML(f.id)}')">pobierz</button>
                    <button class="small info" onclick="previewFile('${escapeHTML(f.id)}')">podgląd</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function downloadFile(id) {
    let f = files.find(f => f.id === id);
    if (!f || !f.data) return alert('błąd pliku');
    
    try {
        let binary = atob(f.data);
        let array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
        
        let blob = new Blob([array]);
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = f.name;
        a.click();
        URL.revokeObjectURL(url);
    } catch (e) {
        alert('błąd pobierania');
    }
}

function previewFile(id) {
    let f = files.find(f => f.id === id);
    if (!f) return;
    
    let content = '🔒 podgląd niedostępny';
    try {
        let binary = atob(f.data);
        let decoder = new TextDecoder('utf-8', { fatal: false });
        content = decoder.decode(new Uint8Array([...binary].map(c => c.charCodeAt(0))));
        if (content.length > 5000) content = content.substring(0,5000) + '\n\n[...przycięto]';
    } catch (e) {}
    
    document.getElementById('previewTitle').textContent = escapeHTML(f.name);
    document.getElementById('previewContent').textContent = content;
    document.getElementById('previewDownloadBtn').onclick = () => downloadFile(id);
    document.getElementById('previewModal').classList.add('active');
}

function closePreview() {
    document.getElementById('previewModal').classList.remove('active');
}

// ==================== ADMIN ====================
function adminLogin() {
    if (document.getElementById('adminPassInput').value === ADMIN_PASSWORD) {
        isAdminLogged = true;
        document.getElementById('adminLoginPanel').style.display = 'none';
        document.getElementById('adminPanelContent').style.display = 'block';
        showStatus('✅ zalogowano', 'success');
        updateUI();
    } else {
        alert('złe hasło');
    }
}

function adminLogout() {
    isAdminLogged = false;
    uploadedFile = null;
    document.getElementById('adminLoginPanel').style.display = 'block';
    document.getElementById('adminPanelContent').style.display = 'none';
    document.getElementById('adminFileInfo').style.display = 'none';
    document.getElementById('uploadBtn').disabled = true;
}

function selectDuration(days, el) {
    selectedDuration = days;
    document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

function generateLicense() {
    let name = escapeHTML(document.getElementById('licenseName').value) || 'key';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) key += chars[Math.floor(Math.random()*chars.length)];
        if (i<2) key += '-';
    }

    let now = new Date();
    let expires = new Date(now.setDate(now.getDate() + selectedDuration));
    
    licenses.push({
        key: key,
        name: name,
        created: new Date().toISOString().split('T')[0],
        expires: expires.toISOString().split('T')[0],
        duration: selectedDuration
    });
    
    saveData();
    
    let d = document.getElementById('generatedKeyDisplay');
    d.textContent = `✅ nowy klucz: ${key}`;
    d.style.display = 'block';
    setTimeout(() => d.style.display = 'none', 4000);
    
    document.getElementById('licenseName').value = '';
    renderKeys();
}

function renderKeys() {
    let list = document.getElementById('keyList');
    if (!licenses.length) {
        list.innerHTML = '<div class="empty-state">🔑 brak kluczy</div>';
        return;
    }

    let html = '';
    licenses.slice().reverse().forEach(l => {
        let status = new Date(l.expires) > new Date() ? '✅' : '❌';
        html += `
            <div class="key-item">
                <div>
                    <span class="key-name">${escapeHTML(l.key)}</span>
                    <div class="key-meta">${escapeHTML(l.name)} • ważny do: ${l.expires}</div>
                </div>
                <button class="small danger" onclick="deleteKey('${escapeHTML(l.key)}')">usuń</button>
            </div>
        `;
    });
    list.innerHTML = html;
}

function deleteKey(key) {
    if (confirm('usunąć ten klucz?')) {
        licenses = licenses.filter(l => l.key !== key);
        saveData();
        renderKeys();
    }
}

// ==================== UPLOAD PLIKÓW (NAPRAWIONE) ====================
function initUploadHandlers() {
    const dropZone = document.getElementById('adminDropZone');
    const fileInput = document.getElementById('adminFileInput');
    
    if (!dropZone || !fileInput) return;
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (isAdminLogged) handleFileSelect(e.dataTransfer.files);
    });
    
    fileInput.addEventListener('change', () => {
        if (isAdminLogged) handleFileSelect(fileInput.files);
    });
}

function handleFileSelect(files) {
    if (!files.length || !isAdminLogged) return;
    
    let file = files[0];
    
    // walidacja rozmiaru (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
        alert('plik jest za duży (max 50MB)');
        return;
    }
    
    uploadedFile = file;
    
    let info = document.getElementById('adminFileInfo');
    let uploadBtn = document.getElementById('uploadBtn');
    
    info.style.display = 'block';
    info.textContent = `📁 ${file.name} (${(file.size/1024).toFixed(2)} KB)`;
    uploadBtn.disabled = false;
    
    showStatus('✅ plik gotowy do publikacji', 'success');
}

async function uploadFile() {
    if (!uploadedFile || !isAdminLogged) {
        showStatus('❌ wybierz plik', 'error');
        return;
    }

    let name = document.getElementById('fileName').value.trim() || uploadedFile.name;
    let desc = document.getElementById('fileDesc').value.trim() || 'brak opisu';

    showStatus('⏳ wysyłanie...', 'info');

    let reader = new FileReader();
    
    reader.onload = async (e) => {
        try {
            let base64Data = e.target.result.split(',')[1];
            
            let newFile = {
                id: Date.now().toString(),
                name: name,
                desc: desc,
                size: uploadedFile.size,
                date: new Date().toISOString(),
                data: base64Data
            };
            
            files.unshift(newFile);
            await saveData();
            
            // reset formularza
            document.getElementById('fileName').value = '';
            document.getElementById('fileDesc').value = '';
            document.getElementById('adminFileInfo').style.display = 'none';
            document.getElementById('uploadBtn').disabled = true;
            uploadedFile = null;
            
            showStatus('✅ plik opublikowany!', 'success');
            
            renderAdminFiles();
            if (currentUserKey) renderFiles();
            
        } catch (error) {
            console.error('błąd uploadu:', error);
            showStatus('❌ błąd publikacji', 'error');
        }
    };
    
    reader.onerror = () => {
        showStatus('❌ błąd odczytu pliku', 'error');
    };
    
    reader.readAsDataURL(uploadedFile);
}

function renderAdminFiles() {
    let list = document.getElementById('adminFilesList');
    if (!files.length) {
        list.innerHTML = '<div class="empty-state">📁 brak plików</div>';
        return;
    }

    let html = '';
    files.forEach(f => {
        let size = (f.size / 1024).toFixed(2) + ' KB';
        if (f.size > 1024*1024) size = (f.size / (1024*1024)).toFixed(2) + ' MB';
        
        html += `
            <div class="admin-file-item">
                <div class="file-info">
                    <div class="file-name">${escapeHTML(f.name)}</div>
                    <div class="file-meta">${size} • ${new Date(f.date).toLocaleString('pl-PL')}</div>
                </div>
                <div style="display:flex;gap:8px">
                    <button class="small info" onclick="previewFile('${escapeHTML(f.id)}')">podgląd</button>
                    <button class="small danger" onclick="deleteFile('${escapeHTML(f.id)}')">usuń</button>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
}

function deleteFile(id) {
    if (!confirm('usunąć ten plik?')) return;
    
    files = files.filter(f => f.id !== id);
    saveData();
    renderAdminFiles();
    if (currentUserKey) renderFiles();
}

// ==================== OFERTY ====================
function showContact() {
    alert('discord: krvl_keine');
}

function buyOffer(type) {
    if (!currentUserKey) return alert('najpierw zaloguj się');
    alert('kontakt: krvl_keine (discord)');
}

// ==================== INICJALIZACJA ====================
document.addEventListener('DOMContentLoaded', () => {
    // ładujemy dane
    loadData();
    
    // odświeżanie co 10 sekund
    setInterval(loadData, 10000);
    
    // sprawdzanie licencji co minutę
    setInterval(() => {
        if (currentUserKey) checkLicense();
    }, 60000);
    
    // inicjalizacja uploadu
    initUploadHandlers();
    
    // enter w polu klucza
    document.getElementById('userKeyInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') userLogin();
    });
});
