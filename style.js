/* style.css - czysty, nowoczesny wygląd */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    color: #eaeaea;
    font-size: 14px;
    line-height: 1.6;
}

.container {
    width: 100%;
    max-width: 1400px;
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* HEADER */
.header {
    padding: 20px 28px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(15, 15, 15, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header h1 {
    color: #fff;
    font-weight: 600;
    font-size: 26px;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fff, #aaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.header .badge {
    color: #888;
    font-size: 13px;
    padding: 6px 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 40px;
}

/* TABS */
.tabs {
    display: flex;
    gap: 4px;
    padding: 0 24px;
    background: rgba(10, 10, 10, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab {
    padding: 16px 28px;
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    transition: all 0.2s ease;
}

.tab:hover {
    color: #fff;
}

.tab.active {
    color: #fff;
}

.tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #fff, #888);
    border-radius: 2px;
}

/* PANELS */
.panel {
    display: none;
    padding: 28px;
    animation: fadeIn 0.3s ease;
}

.panel.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* LOGIN SECTION */
.login-section {
    max-width: 400px;
    margin: 60px auto;
    background: rgba(15, 15, 15, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 36px;
    box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
}

.login-section h2 {
    color: #fff;
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 28px;
    text-align: center;
}

/* FORM FIELDS */
.field {
    margin-bottom: 22px;
}

.field label {
    display: block;
    color: #888;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}

.field input, .field textarea {
    width: 100%;
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 14px 18px;
    color: #fff;
    font-size: 14px;
    border-radius: 12px;
    transition: all 0.2s ease;
}

.field input:focus, .field textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(15, 15, 15, 0.9);
}

.field input::placeholder, .field textarea::placeholder {
    color: #444;
}

/* BUTTONS */
button {
    background: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.2s ease;
}

button:hover {
    background: rgba(40, 40, 40, 0.9);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

button.primary {
    background: linear-gradient(135deg, #fff, #e0e0e0);
    color: #000;
    border: none;
    font-weight: 600;
}

button.primary:hover {
    background: linear-gradient(135deg, #e0e0e0, #ccc);
    box-shadow: 0 10px 20px -10px rgba(255, 255, 255, 0.2);
}

button.small {
    padding: 10px 18px;
    font-size: 13px;
}

button.danger {
    background: rgba(255, 80, 80, 0.1);
    border-color: rgba(255, 80, 80, 0.2);
    color: #ff8a8a;
}

button.danger:hover {
    background: rgba(255, 80, 80, 0.15);
    border-color: rgba(255, 80, 80, 0.3);
}

button.success {
    background: rgba(80, 255, 80, 0.1);
    border-color: rgba(80, 255, 80, 0.2);
    color: #8aff8a;
}

button.success:hover {
    background: rgba(80, 255, 80, 0.15);
    border-color: rgba(80, 255, 80, 0.3);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* USER HEADER */
.user-header {
    background: rgba(15, 15, 15, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px 24px;
    margin-bottom: 28px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

.key-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.key-info span {
    background: rgba(0, 0, 0, 0.3);
    padding: 8px 18px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    font-weight: 500;
}

/* LICENSE BADGE */
.license-status {
    font-size: 13px;
    padding: 8px 18px;
    border-radius: 30px;
    border: 1px solid;
    transition: all 0.3s ease;
}

.license-status.active {
    border-color: rgba(80, 255, 80, 0.3);
    background: rgba(80, 255, 80, 0.1);
    color: #8aff8a;
}

.license-status.expiring {
    border-color: rgba(255, 255, 80, 0.3);
    background: rgba(255, 255, 80, 0.1);
    color: #ffff8a;
}

.license-status.expired {
    border-color: rgba(255, 80, 80, 0.3);
    background: rgba(255, 80, 80, 0.1);
    color: #ff8a8a;
}

/* FILES SECTION */
.files-section {
    background: rgba(15, 15, 15, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 28px;
}

.files-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.files-header h3 {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
}

/* SEARCH */
.search-box {
    margin-bottom: 24px;
}

.search-box input {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 14px 20px;
    color: #fff;
    border-radius: 40px;
    font-size: 14px;
    transition: all 0.2s ease;
}

.search-box input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(10, 10, 10, 0.4);
}

/* FILES GRID */
.files-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 28px;
}

.file-item {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.2s ease;
    backdrop-filter: blur(5px);
}

.file-item:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 30px -15px rgba(0, 0, 0, 0.5);
    background: rgba(10, 10, 10, 0.4);
}

.file-name {
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;
    word-break: break-word;
}

.file-meta {
    color: #888;
    font-size: 12px;
    margin-bottom: 15px;
}

.file-actions {
    display: flex;
    gap: 10px;
}

.file-actions button {
    flex: 1;
    padding: 10px;
    font-size: 12px;
}

/* STATS */
.stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    color: #888;
    font-size: 13px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.stats-row span {
    color: #fff;
    margin-left: 6px;
    font-weight: 600;
}

/* ADMIN SECTION */
.admin-section {
    background: rgba(15, 15, 15, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 28px;
}

.admin-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    gap: 15px;
}

.grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    margin-bottom: 28px;
}

.box {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    padding: 24px;
    backdrop-filter: blur(5px);
}

.box h3 {
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* UPLOAD AREA */
.upload-area {
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 16px;
    background: rgba(0, 0, 0, 0.2);
}

.upload-area:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(10, 10, 10, 0.3);
}

.upload-area p {
    color: #888;
    font-size: 14px;
}

.upload-area p span {
    color: #fff;
    text-decoration: underline;
}

/* DURATION SELECTOR */
.duration-selector {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    flex-wrap: wrap;
}

.duration-btn {
    flex: 1;
    padding: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #888;
    border-radius: 30px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.duration-btn:hover {
    background: rgba(30, 30, 30, 0.5);
    color: #fff;
}

.duration-btn.active {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
}

/* LISTS */
.key-list, .admin-files-list {
    margin-top: 20px;
    max-height: 350px;
    overflow-y: auto;
}

.key-item {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.key-item .key-name {
    color: #fff;
    font-weight: 500;
}

.key-item .key-meta {
    color: #888;
    font-size: 11px;
    margin-top: 2px;
}

.admin-file-item {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

.admin-file-item .file-info {
    flex: 1;
}

.admin-file-item .file-name {
    color: #fff;
    margin-bottom: 4px;
}

/* MODAL */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.modal.active {
    display: flex;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: rgba(15, 15, 15, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 28px;
    max-width: 700px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.modal-header h3 {
    color: #fff;
    font-weight: 500;
    font-size: 18px;
}

.modal-close {
    background: none;
    border: none;
    color: #888;
    font-size: 24px;
    cursor: pointer;
    padding: 0 10px;
}

.modal-close:hover {
    color: #fff;
}

.preview-content {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    font-family: 'SF Mono', monospace;
    font-size: 13px;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 400px;
    overflow-y: auto;
}

/* FOOTER */
.footer {
    padding: 20px 28px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(10, 10, 10, 0.8);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    color: #888;
    font-size: 12px;
    gap: 15px;
}

.footer a {
    color: #888;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
}

.footer a:hover {
    color: #fff;
    border-bottom-color: #fff;
}

/* SCROLLBAR */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* UTILITY */
.small {
    font-size: 11px;
    color: #888;
}

.text-success {
    color: #8aff8a;
}

.text-error {
    color: #ff8a8a;
}

/* RESPONSIVE */
@media (max-width: 600px) {
    .container {
        border-radius: 16px;
    }
    
    .header, .footer {
        padding: 16px 20px;
    }
    
    .panel {
        padding: 16px;
    }
    
    .login-section {
        padding: 24px;
        margin: 30px auto;
    }
    
    .files-grid {
        grid-template-columns: 1fr;
    }
    
    .tabs {
        padding: 0 10px;
    }
    
    .tab {
        padding: 14px 16px;
        font-size: 13px;
    }
}
