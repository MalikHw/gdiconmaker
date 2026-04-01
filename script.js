const fkdNames = ['hitler','epstein','stalin','mussolini','mao','pol pot','goebbels','himmler','mengele','bin laden','saddam hussein','idi amin','jeffrey dahmer','ted bundy','charles manson','john wayne gacy','timothy mcveigh','osama','jihadi john','isis','al qaeda','nazi','kkk','putin','kim jong','castro'];

function createDonateDropdown() {
    const existing = document.getElementById('donateDropdownOverlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'donateDropdownOverlay';
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
        <div id="donateDropdownBox" class="modal donate-modal">
            <div class="modal-content">
                <button id="donateDropdownClose" class="modal-close-x" title="close">
                    <i class="nf nf-fa-times"></i>
                </button>
                <div class="modal-header">
                    <i class="nf nf-fa-heart" style="color:#e74c3c; font-size:40px;"></i>
                    <h2>support the dev!</h2>
                    <p class="modal-sub">this tool is 100% free — any support helps a ton</p>
                </div>
                <div class="modal-body">
                    <div class="dd-btn-row">
                        <a class="dd-link-btn" href="https://absolllute.com/store/mega_hack?gift=1" target="_blank" rel="noopener">
                            <i class="nf nf-fa-shopping_cart dd-icon"></i>
                            <span class="dd-label">
                                Buy MHv9
                                <span class="dd-sub">get me Mega Hack v9 as a gift!(it'll be a W)</span>
                            </span>
                            <i class="nf nf-fa-external_link dd-arrow"></i>
                        </a>
                        <a class="dd-link-btn" href="https://throne.com/MalikHw47" target="_blank" rel="noopener">
                            <i class="nf nf-fa-gift dd-icon"></i>
                            <span class="dd-label">
                                Get me a gift!
                                <span class="dd-sub">Gift me anything else from Throne</span>
                            </span>
                            <i class="nf nf-fa-external_link dd-arrow"></i>
                        </a>
                        <a class="dd-link-btn" href="https://discord.gg/G9bZ92eg2n" target="_blank" rel="noopener">
                            <i class="nf nf-fa-discord dd-icon"></i>
                            <span class="dd-label">
                                Boost our Discord server
                                <span class="dd-sub">join &amp; boost my discord community</span>
                            </span>
                            <i class="nf nf-fa-external_link dd-arrow"></i>
                        </a>
                    </div>
                    <div class="dd-kofi-wrap" id="kofiWidgetZone"></div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeDonateDropdown();
    });
    document.getElementById('donateDropdownClose').addEventListener('click', closeDonateDropdown);

    const kofiZone = document.getElementById('kofiWidgetZone');
    if (typeof kofiwidget2 !== 'undefined') {
        kofiwidget2.init('Sponsor', '#525252', 'G2G310RTCB');
        kofiZone.innerHTML = kofiwidget2.getHTML();
    } else {
        const kofiScript = document.createElement('script');
        kofiScript.type = 'text/javascript';
        kofiScript.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
        kofiScript.onload = function() {
            if (typeof kofiwidget2 !== 'undefined') {
                kofiwidget2.init('Sponsor', '#525252', 'G2G310RTCB');
                kofiZone.innerHTML = kofiwidget2.getHTML();
            }
        };
        document.head.appendChild(kofiScript);
    }

    const escHandler = (e) => {
        if (e.key === 'Escape') { closeDonateDropdown(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);
}

function closeDonateDropdown() {
    const overlay = document.getElementById('donateDropdownOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
}

function interceptDonateLinks() {
    document.querySelectorAll('a.donate-link, a[href*="malikhw.github.io/donate"]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            createDonateDropdown();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const submitBt = document.getElementById('submitBtn');
    const rslt = document.getElementById('result');
    const dropZone = document.getElementById('dropZone');
    const authIn = document.getElementById('packAuthor');
    const nameIn = document.getElementById('packName');
    const packIconIn = document.getElementById('packIcon');
    const packIconPrev = document.getElementById('packIconPreview');
    const packIconImg = document.getElementById('packIconImg');

    const now = new Date();
    const mnth = now.getMonth() + 1;
    const dy = now.getDate();

    if (mnth === 8 && dy === 31) doMikuBday();
    if (mnth === 1 && dy === 20) doEpsteinShit();

    setupGamemodeChks();
    checkIfMobile();
    loadIconReq();
    interceptDonateLinks();
    initImgProc();
    setupCropBtns();

    
    document.body.dataset.month = mnth;
    document.body.dataset.day = dy;

    const savedAuth = localStorage.getItem('gdIconAuthor');
    if (savedAuth) authIn.value = savedAuth;

    authIn.addEventListener('change', function() {
        localStorage.setItem('gdIconAuthor', this.value);
    });

    nameIn.addEventListener('blur', checkControversial);
    authIn.addEventListener('blur', checkControversial);

    packIconIn.addEventListener('change', function(e) {
        const fl = e.target.files[0];
        if (!fl) return;
        if (fl.size > 5 * 1024 * 1024) {
            alert('pack icon too thicc bro, max 5MB');
            this.value = '';
            return;
        }
        const rdr = new FileReader();
        rdr.onload = function(evt) {
            packIconImg.src = evt.target.result;
            packIconPrev.style.display = 'block';
        };
        rdr.readAsDataURL(fl);
    });

    document.getElementById('removePackIcon').addEventListener('click', function() {
        packIconIn.value = '';
        packIconPrev.style.display = 'none';
        packIconImg.src = '';
    });

    document.getElementById('tutorialToggle').addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('tutorialContent').classList.toggle('active');
    });

    loadYT();

    
    submitBt.addEventListener('click', async function() {
        const aprilFoolsDone = this.dataset.aprilFoolsBypassed === 'true';
        delete this.dataset.aprilFoolsBypassed; // it clear it immediately
        const procsdImgs = getProcsdImgs();

        if (procsdImgs.length === 0) {
            alert('bruh select a pic first');
            return;
        }

        const pckName = nameIn.value.trim();
        const pckAuth = authIn.value.trim();

        if (!pckName || !pckAuth) {
            alert('fill in the pack name and author bro');
            return;
        }

        const lmt = checkZipLimit();
        if (!lmt.ok) {
            alert(`yo u hit the limit bro, ${lmt.remaining} zips left today (resets in ${lmt.hoursLeft}h)`);
            return;
        }

        if (mnth === 4 && dy === 1 && !aprilFoolsDone) {
            showFakePremium();
            return;
        }

        const doCube = document.getElementById('doCube').checked;
        const doWave = document.getElementById('doWave').checked;
        const doBall = document.getElementById('doBall').checked;

        if (!doCube && !doWave && !doBall) {
            alert('Select at least one gamemode bruh');
            return;
        }

        submitBt.disabled = true;
        document.querySelector('.btn-text').style.display = 'none';
        document.querySelector('.btn-loading').style.display = 'inline';

        try {
            rslt.className = 'result warning';
            rslt.innerHTML = '<p>⚙️ generating your pack client-side, hang tight...</p>';

            const zipBlob = await generateIconPack({
                processedImgs: procsdImgs,
                packName: pckName,
                packAuthor: pckAuth,
                doCube,
                doWave,
                doBall,
                customPackIconFile: packIconIn.files[0] || null
            });

            incrZipCount();

            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = pckName.replace(/[^a-zA-Z0-9_-]/g, '_') + '.zip';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 1000);

            rslt.className = 'result success';
            rslt.innerHTML = `
                <h3>✓ done!</h3>
                <p>Icon pack created with ${procsdImgs.length} icon(s)!</p>
                <p style="font-size: 14px; color: #666; margin-top: 10px;">
                    <i class="nf nf-fa-download"></i> download started!
                </p>
            `;

            setTimeout(() => showDonateModal(), 500);

        } catch (err) {
            rslt.className = 'result error';
            rslt.innerHTML = `
                <h3>✗ shit broke</h3>
                <p>${err.message || 'something fucked up, try again'}</p>
            `;
            console.error(err);
        } finally {
            submitBt.disabled = false;
            document.querySelector('.btn-text').style.display = 'inline';
            document.querySelector('.btn-loading').style.display = 'none';
        }
    });

    
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
        const fls = e.dataTransfer.files;
        if (fls.length > 0) {
            document.getElementById('iconImage').files = fls;
            document.getElementById('iconImage').dispatchEvent(new Event('change'));
        }
    });

    
    function checkControversial() {
        const txt = (nameIn.value + ' ' + authIn.value).toLowerCase();
        for (let nm of fkdNames) {
            if (txt.includes(nm)) {
                showControversialPopup();
                break;
            }
        }
    }

    function showControversialPopup() {
        const modOvr = document.createElement('div');
        modOvr.className = 'modal-overlay';
        const mod = document.createElement('div');
        mod.className = 'modal';
        mod.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 style="font-size:48px;">😳</h2>
                    <h2>im sorry WHAT?</h2>
                </div>
                <div class="modal-body">
                    <p style="font-size: 16px; color: #666;">
                        bruh... really? aight im still gonna process it but damn
                    </p>
                    <button type="button" class="modal-btn close-btn" id="closeControversial">
                        <i class="nf nf-fa-times"></i> my bad
                    </button>
                </div>
            </div>
        `;
        modOvr.appendChild(mod);
        document.body.appendChild(modOvr);
        setTimeout(() => modOvr.classList.add('active'), 10);
        document.getElementById('closeControversial').addEventListener('click', () => {
            modOvr.classList.remove('active');
            setTimeout(() => document.body.removeChild(modOvr), 300);
        });
    }

    
    function checkZipLimit() {
        const todayKey = new Date().toDateString();
        let zipData = localStorage.getItem('zipLimitData');
        if (zipData) {
            zipData = JSON.parse(zipData);
            if (zipData.date !== todayKey) {
                zipData = { date: todayKey, count: 0 };
                localStorage.setItem('zipLimitData', JSON.stringify(zipData));
            }
        } else {
            zipData = { date: todayKey, count: 0 };
            localStorage.setItem('zipLimitData', JSON.stringify(zipData));
        }
        const now2 = new Date();
        const tomorrow = new Date(now2);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const msLeft = tomorrow - now2;
        const hrsLeft = Math.ceil(msLeft / (1000 * 60 * 60));
        return {
            ok: zipData.count < 10,
            remaining: 10 - zipData.count,
            hoursLeft: hrsLeft
        };
    }

    function incrZipCount() {
        const todayKey = new Date().toDateString();
        let zipData = JSON.parse(localStorage.getItem('zipLimitData') || '{"date":"","count":0}');
        if (zipData.date !== todayKey) {
            zipData = { date: todayKey, count: 1 };
        } else {
            zipData.count++;
        }
        localStorage.setItem('zipLimitData', JSON.stringify(zipData));
    }

    
    function loadYT() {
        fetch('config.json')
            .then(r => r.json())
            .then(cfg => {
                const ytCont = document.getElementById('youtubeEmbed');
                const yt = cfg.youtube || {};
                if (yt.visible && yt.videoId) {
                    ytCont.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    ytCont.innerHTML = ytPlaceholder();
                }
            })
            .catch(() => {
                document.getElementById('youtubeEmbed').innerHTML = ytPlaceholder();
            });
    }

    function ytPlaceholder() {
        return `
            <div class="youtube-placeholder">
                <i class="nf nf-fa-video_camera"></i>
                <p>we're looking for anyone who can do the yt tutorial video!</p>
                <a href="https://forms.gle/3jY4UEEc5tBVBVWm7" target="_blank">
                    <i class="nf nf-fa-external_link"></i> help us out
                </a>
            </div>
        `;
    }

    function loadIconReq() {
        fetch('config.json')
            .then(r => r.json())
            .then(cfg => {
                const ir = cfg.iconRequest || {};
                if (ir.visible && ir.url) {
                    document.getElementById('iconRequestCard').style.display = 'block';
                    document.getElementById('iconRequestBtn').href = ir.url;
                }
            })
            .catch(() => {});
    }

    
    function showDonateModal() {
        const modOvr = document.createElement('div');
        modOvr.className = 'modal-overlay';
        const mod = document.createElement('div');
        mod.className = 'modal';
        mod.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <i class="nf nf-fa-heart" style="color: #e74c3c; font-size: 48px;"></i>
                    <h2>liking it?</h2>
                </div>
                <div class="modal-body">
                    <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
                        this tool is <strong>100% free</strong> and always will be!
                        if u found it helpful, consider donating!
                    </p>
                    <div class="modal-buttons">
                        <button type="button" class="modal-btn donate-btn" id="openDonateFromModal">
                            <i class="nf nf-fa-heart"></i> donate
                        </button>
                        <button type="button" class="modal-btn close-btn" id="closeDonate">
                            <i class="nf nf-fa-times"></i> nah
                        </button>
                    </div>
                    <p style="font-size: 12px; color: #999; margin-top: 15px;">
                        no pressure! ur download already started 😊
                    </p>
                </div>
            </div>
        `;
        modOvr.appendChild(mod);
        document.body.appendChild(modOvr);
        setTimeout(() => modOvr.classList.add('active'), 10);

        document.getElementById('openDonateFromModal').addEventListener('click', () => {
            modOvr.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modOvr);
                createDonateDropdown();
            }, 200);
        });

        document.getElementById('closeDonate').addEventListener('click', function closeDonateAndShare() {
            modOvr.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modOvr);
                showSharePopup();
            }, 300);
        });
    }

    function showSharePopup() {
        const shareTxt = document.querySelector('meta[name="share-text"]').content;
        const shareOvr = document.createElement('div');
        shareOvr.className = 'modal-overlay';
        const shareMod = document.createElement('div');
        shareMod.className = 'modal';
        shareMod.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <i class="nf nf-fa-share_alt" style="color: #667eea; font-size: 48px;"></i>
                    <h2>spread the site!</h2>
                </div>
                <div class="modal-body">
                    <p style="font-size: 15px; color: #666; margin-bottom: 15px;">
                        loved the tool? share it! copy this:
                    </p>
                    <div class="share-text-box">
                        <textarea id="shareTextArea" readonly>${shareTxt}</textarea>
                    </div>
                    <div class="modal-buttons">
                        <button type="button" class="modal-btn copy-btn" id="copyShareTxt">
                            <i class="nf nf-fa-copy"></i> copy
                        </button>
                        <button type="button" class="modal-btn close-btn" id="closeShare">
                            <i class="nf nf-fa-times"></i> close
                        </button>
                    </div>
                    <p style="font-size: 12px; color: #999; margin-top: 15px;">
                        post it anywhere! reddit, discord, twitter, wherever 🙏
                    </p>
                </div>
            </div>
        `;
        shareOvr.appendChild(shareMod);
        document.body.appendChild(shareOvr);
        setTimeout(() => shareOvr.classList.add('active'), 10);

        document.getElementById('copyShareTxt').addEventListener('click', function() {
            const txtarea = document.getElementById('shareTextArea');
            txtarea.select();
            document.execCommand('copy');
            this.innerHTML = '<i class="nf nf-fa-check"></i> copied!';
            this.style.background = '#28a745';
            setTimeout(() => {
                this.innerHTML = '<i class="nf nf-fa-copy"></i> copy';
                this.style.background = '';
            }, 2000);
        });

        document.getElementById('closeShare').addEventListener('click', function() {
            shareOvr.classList.remove('active');
            setTimeout(() => document.body.removeChild(shareOvr), 300);
        });
    }

    function showFakePremium() {
        const modOvr = document.createElement('div');
        modOvr.className = 'modal-overlay';
        const mod = document.createElement('div');
        mod.className = 'modal premium-modal';
        mod.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 style="background: linear-gradient(135deg, #ffd700, #ffed4e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px;">
                        ✨ UPGRADE TO PREMIUM ✨
                    </h2>
                </div>
                <div class="modal-body">
                    <p style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">
                        Unlock these AMAZING features:
                    </p>
                    <ul style="text-align: left; margin: 20px auto; max-width: 400px; font-size: 14px; line-height: 2;">
                        <li>❌ 1 icon per pack max</li>
                        <li>❌ Watermark on every icon</li>
                        <li>❌ 480p quality only</li>
                        <li>❌ 24 hour processing time</li>
                        <li>❌ Random icon rotation bug</li>
                        <li>❌ Ads every 10 seconds</li>
                        <li>❌ Your data sold to advertisers</li>
                        <li>❌ Captcha before every download</li>
                    </ul>
                    <p style="font-size: 24px; font-weight: 700; color: #e74c3c; margin: 20px 0;">
                        Only $99.99/month!
                    </p>
                    <button type="button" class="modal-btn donate-btn" id="fakePremiumBtn" style="font-size: 20px; padding: 20px;">
                        💳 UPGRADE NOW
                    </button>
                    <p style="font-size: 10px; color: #999; margin-top: 20px;">
                        *auto-renews forever, cant cancel, we keep charging even after u die
                    </p>
                </div>
            </div>
        `;
        modOvr.appendChild(mod);
        document.body.appendChild(modOvr);
        setTimeout(() => modOvr.classList.add('active'), 10);

        document.getElementById('fakePremiumBtn').addEventListener('click', () => {
            mod.querySelector('.modal-body').innerHTML = `
                <h2 style="font-size: 48px; margin: 40px 0;">😂</h2>
                <h3 style="font-size: 24px;">jk bro</h3>
                <p style="font-size: 16px; color: #666; margin: 20px 0;">
                    this shits free forever lmao
                </p>
                <button type="button" class="modal-btn close-btn" id="closeAprilFools">
                    <i class="nf nf-fa-times"></i> aight cool
                </button>
            `;
            document.getElementById('closeAprilFools').addEventListener('click', () => {
                modOvr.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modOvr);
                    submitBt.dataset.aprilFoolsBypassed = 'true';
                    submitBt.click();
                }, 300);
            });
        });
    }

    
    function doMikuBday() {
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 }, colors: ['#39c5bb', '#5eaee5', '#91d8f7'] });
        const bnr = document.createElement('div');
        bnr.className = 'miku-banner';
        bnr.innerHTML = '<h1>🎉 HAPPY BDAY MIKU! 🎂</h1>';
        document.body.appendChild(bnr);
        setTimeout(() => {
            confetti({ particleCount: 150, spread: 120, origin: { y: 0.7 }, colors: ['#39c5bb', '#5eaee5', '#91d8f7'] });
        }, 1000);
    }

    function doEpsteinShit() {
        setInterval(() => {
            redactText();
            setTimeout(() => unredactText(), 5000);
        }, 10000);
    }

    function redactText() {
        document.querySelectorAll('p, li, span, h1, h2, h3, label, button, a').forEach(el => {
            if (el.classList.contains('redacted')) return;
            const txt = el.textContent;
            if (txt.length > 5) {
                const half = Math.floor(txt.length / 2);
                const redactStart = Math.floor(Math.random() * half);
                const redactLen = Math.floor(Math.random() * half) + 1;
                el.dataset.origText = txt;
                el.textContent = txt.substring(0, redactStart) + '█'.repeat(redactLen) + txt.substring(redactStart + redactLen);
                el.classList.add('redacted');
            }
        });
    }

    function unredactText() {
        document.querySelectorAll('.redacted').forEach(el => {
            if (el.dataset.origText) el.textContent = el.dataset.origText;
            el.classList.remove('redacted');
        });
    }

    
    function checkIfMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('is-mobile');
        }
    }
});
