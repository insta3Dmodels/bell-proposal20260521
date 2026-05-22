document.addEventListener('DOMContentLoaded', () => {
  // Slide Navigation Elements
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  
  // Presenter Drawer Elements
  const toggleNotesBtn = document.getElementById('toggle-notes-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const presenterDrawer = document.getElementById('presenter-drawer');
  const scriptCards = document.querySelectorAll('.script-card');
  const timerElement = document.getElementById('presentation-timer');

  // Modal Elements
  const contactBtn = document.getElementById('contact-btn');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const industrySelect = document.getElementById('c-industry');

  // Video Players
  const playIcons = document.querySelectorAll('.play-icon');

  // State Management
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  let timerInterval = null;
  let secondsElapsed = 0;

  // 1. Presentation Slide Controller Engine
  function updateSlides() {
    // Loop through slides and toggle active state
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Indicators (Dots)
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update Progress Bar
    const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Manage Prev/Next Buttons disabled state
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Sync Presenter Drawer Scripts with current active slide
    syncPresenterScripts();
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    }
  }

  // Hook Up Controls
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlideIndex = idx;
      updateSlides();
    });
  });

  // Keyboard navigation listener
  document.addEventListener('keydown', (e) => {
    // Arrow keys or Spacebar
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  });

  // 2. Presenter Notes Drawer Engine
  function togglePresenterDrawer() {
    if (presenterDrawer) {
      presenterDrawer.classList.toggle('active');
    }
  }

  if (toggleNotesBtn) {
    toggleNotesBtn.addEventListener('click', togglePresenterDrawer);
  }
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      if (presenterDrawer) {
        presenterDrawer.classList.remove('active');
      }
    });
  }

  function syncPresenterScripts() {
    if (!scriptCards || scriptCards.length === 0) return;
    const activeSlideId = slides[currentSlideIndex].id;
    
    scriptCards.forEach(card => {
      const scriptFor = card.getAttribute('data-script-for');
      if (scriptFor === activeSlideId) {
        card.classList.add('active');
        // Scroll target card into view inside the scrollable drawer
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.classList.remove('active');
      }
    });
  }

  // 3. Presentation Stopwatch Timer
  function startStopwatch() {
    if (!timerElement) return;
    secondsElapsed = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
      const secs = (secondsElapsed % 60).toString().padStart(2, '0');
      timerElement.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  startStopwatch(); // Start counting immediately upon load if element exists

  // 4. Interactive Sponsorship Matcher Data Block
  const sponsorshipData = {
    beauty: {
      pkgName: "時尚名流限量聯名案",
      budget: "預算階梯：S級 / A級",
      title: "「思慕之名」香氛保養與舞台聯名合作",
      desc: "以鍾綺的法式靈魂樂與時尚爆乳話題為核心，開發限量「思慕之名」保養香水聯名禮盒，於演唱會現場及貝爾工作室電商平台全球發售。",
      bullets: [
        "<strong>演唱會現場攤位：</strong>台北/高雄場 VIP 接待區品牌體驗專區。",
        "<strong>舞台特寫置入：</strong>鍾綺登台演出之專屬服飾與妝容合作品牌露面。",
        "<strong>數位聯動：</strong>鍾綺社群（IG/FB/YT）短影音置入，聯動宣傳銷售。",
        "<strong>粉絲專屬優惠：</strong>演唱會門票隨電商禮包抽獎贈送，極速吸粉。"
      ],
      exposure: "500萬+",
      roi: "150%"
    },
    health: {
      pkgName: "尊榮熟齡健康贊助案",
      budget: "預算階梯：S級 / 榮譽冠名",
      title: "「寶島情懷」高淨值養生漢方禮盒案",
      desc: "鎖定楊烈大哥具備極高自主消費力與高淨值財富的熟齡中老年粉絲群，推出「寶島頌」人蔘燕窩健康禮盒，演唱會官方宣傳海報及購票贈禮合作品牌。",
      bullets: [
        "<strong>現場尊榮保留：</strong>台北/台中/高雄 VIP 席專屬招待票券（供品牌主VIP客戶）。",
        "<strong>大螢幕冠名：</strong>開演前及謝幕時大螢幕品牌廣告輪播。",
        "<strong>電商大數據合作：</strong>貝爾工作室電商平台向購票熟齡受眾精準推送養生優惠。",
        "<strong>聯名主視覺宣傳：</strong>宣傳影片與官方媒體通稿聯合報導品牌正面公益形象。"
      ],
      exposure: "350萬+",
      roi: "180%"
    },
    ecommerce: {
      pkgName: "數位流量電商大慶合作案",
      budget: "預算階梯：A級 / B級",
      title: "自由之地 × 電商平台年中大慶聯動案",
      desc: "聯合大型電商平台（如蝦皮、MOMO等）開設「自由之地音樂館」專區，整合楊烈出道55週年數位專輯發行與鍾綺直播帶貨，達成聲量與銷量的高效互鎖。",
      bullets: [
        "<strong>直播音樂會：</strong>鍾綺親臨電商平台直播間，現場演唱與帶貨限量周邊商品。",
        "<strong>平台獨家活動：</strong>獨家發售演唱會聯名T-shirt及紀念海報。",
        "<strong>聯名優惠券：</strong>購票用戶附贈電商平台專屬大額折價券。",
        "<strong>數位廣告置入：</strong>售票系統頁面及智庫宣傳短影音直接嵌入平台連結。"
      ],
      exposure: "800萬+",
      roi: "220%"
    },
    financial: {
      pkgName: "高階金融VIP客戶專屬公關案",
      budget: "預算階梯：S級 / 策略包場",
      title: "尊榮「自由之地」理財貴賓之夜公關專案",
      desc: "為銀行財富管理貴賓、保險高階客戶或高端會所會員打造的專屬文化公關企劃。結合蕭美琴副總統親臨的國家級認證，樹立品牌支持文化產業傳承的頂級典範。",
      bullets: [
        "<strong>VIP 專屬包廂包場：</strong>高雄場或日本巡演專屬 VIP 貴賓包廂，提供頂級精緻外燴。",
        "<strong>藝人後台見面會：</strong>鍾綺與楊烈大哥親臨 VIP 包廂與貴賓合影留念、贈送簽名海報。",
        "<strong>專屬品牌致謝：</strong>演唱會節目手冊與官方貴賓席精美桌牌冠名。",
        "<strong>高端聯合沙龍：</strong>鍾綺法式台語音樂沙龍專場表演為品牌理財講座助陣。"
      ],
      exposure: "200萬+",
      roi: "120% (高溢價)"
    }
  };

  // Switch Sponsorship matching elements dynamically
  const industryBtns = document.querySelectorAll('.industry-btn');
  const pkgNameEl = document.getElementById('pkg-name');
  const pkgBudgetEl = document.getElementById('pkg-budget');
  const pkgTitleEl = document.getElementById('pkg-title');
  const pkgDescEl = document.getElementById('pkg-desc');
  const pkgBulletsEl = document.getElementById('pkg-bullets');
  const roiExposureEl = document.getElementById('roi-exposure');
  const roiSalesEl = document.getElementById('roi-sales');
  const matchingResultCard = document.getElementById('matching-result-card');

  industryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      industryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const industryKey = btn.getAttribute('data-industry');
      const data = sponsorshipData[industryKey];

      // Smooth visual replacement animation
      matchingResultCard.style.opacity = '0.3';
      matchingResultCard.style.transform = 'translateY(5px)';

      setTimeout(() => {
        if (data) {
          pkgNameEl.textContent = data.pkgName;
          pkgBudgetEl.textContent = data.budget;
          pkgTitleEl.textContent = data.title;
          pkgDescEl.textContent = data.desc;

          // Render custom bullet points
          pkgBulletsEl.innerHTML = '';
          data.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.innerHTML = bullet;
            pkgBulletsEl.appendChild(li);
          });

          // Render metrics
          roiExposureEl.textContent = data.exposure;
          roiSalesEl.textContent = data.roi;

          // Sync select option in modal form
          industrySelect.value = industryKey;
        }
        matchingResultCard.style.opacity = '1';
        matchingResultCard.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  const modalInputState = document.getElementById('modal-input-state');
  const modalSuccessState = document.getElementById('modal-success-state');
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const successCloseBtn = document.getElementById('success-close-btn');

  // 5. Contact Modal Controls & Google Sheets Submission
  contactBtn.addEventListener('click', () => {
    // Reset state back to input form
    modalInputState.style.display = 'block';
    modalSuccessState.style.display = 'none';
    if (contactForm) contactForm.reset();
    if (contactSubmitBtn) {
      contactSubmitBtn.disabled = false;
      contactSubmitBtn.innerHTML = '確認送出提案意向';
    }
    contactModal.classList.add('active');
  });

  const closeModalAndReset = () => {
    contactModal.classList.remove('active');
    setTimeout(() => {
      modalInputState.style.display = 'block';
      modalSuccessState.style.display = 'none';
      if (contactForm) contactForm.reset();
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = '確認送出提案意向';
      }
    }, 400);
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModalAndReset);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closeModalAndReset);

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      closeModalAndReset();
    }
  });

  // Google Apps Script Web App URL Integration
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> 正在傳送提案意向...';
      }

      // Retrieve values
      const nameVal = document.getElementById('c-name').value;
      const companyVal = document.getElementById('c-company').value;
      const industryVal = document.getElementById('c-industry').value;
      const emailVal = document.getElementById('c-email').value;
      const notesVal = document.getElementById('c-notes').value;

      const payload = {
        name: nameVal,
        company: companyVal,
        industry: industryVal,
        email: emailVal,
        notes: notesVal
      };

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxe1l6h5TvmcF0z_LCwGU2zM-7TQxJtYA3Gnd0bH13K85gI49g8MOySlNwFtd-QCJE/exec';

      fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Prevent browser CORS blockages
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        // Transition to success screen smoothly
        if (modalInputState) modalInputState.style.opacity = '0';
        setTimeout(() => {
          if (modalInputState) {
            modalInputState.style.display = 'none';
            modalInputState.style.opacity = '1';
          }
          if (modalSuccessState) {
            modalSuccessState.style.display = 'block';
          }
        }, 300);
      })
      .catch(error => {
        console.error('Error submitting to Google Sheets:', error);
        alert('傳送失敗，請稍後再試！或直接聯絡電商經理：bellmusicstudio@gmail.com');
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = '確認送出提案意向';
        }
      });
    });
  }

  // 6. Fullscreen Mode Toggle
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`無法開啟全螢幕模式: ${err.message}`);
      });
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i> <span>視窗模式</span>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i> <span>全螢幕</span>';
    }
  });

  // 7. Video play event listeners (Open in new tab with elegant user feedback Toast)
  const videoUrls = {
    "台、日、美 音樂藝術交流": "https://www.youtube.com/results?search_query=楊烈+自由之地+世界巡迴演唱會",
    "全新歌曲《寶島頌》宣傳 Short": "https://www.youtube.com/results?search_query=楊烈+寶島頌",
    "鍾綺與歌王同台 張力拉滿": "https://www.youtube.com/results?search_query=鍾綺+楊烈+思慕的人"
  };

  playIcons.forEach(icon => {
    const mockPlayer = icon.closest('.mock-player');
    if (mockPlayer) {
      mockPlayer.style.cursor = 'pointer';
      // Clicking player container acts the same
      mockPlayer.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerVideoPlay(icon);
      });
    }

    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerVideoPlay(icon);
    });
  });

  function triggerVideoPlay(icon) {
    const card = icon.closest('.video-track-card');
    const videoTitle = card.querySelector('h3').textContent.trim();
    const targetUrl = videoUrls[videoTitle] || "https://www.youtube.com";

    // Simulate play loading, then open a new window
    const originalClass = icon.className;
    icon.className = "fa-solid fa-circle-notch fa-spin play-icon text-gold";

    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(255, 75, 180, 0.95)';
    toast.style.color = '#fff';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = '50px';
    toast.style.zIndex = '999';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = '0 5px 15px rgba(255, 75, 180, 0.4)';
    toast.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = `🎬 正在開啟新分頁播放：《${videoTitle}》...`;
    document.body.appendChild(toast);

    setTimeout(() => {
      icon.className = originalClass;
      toast.remove();
      window.open(targetUrl, '_blank');
    }, 600);
  }

  // 8. Mobile Swipe Navigation Gestures
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  const slidesContainer = document.querySelector('.slides-container');

  if (slidesContainer) {
    slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const threshold = 50;

    // Check if the swipe was mostly horizontal and exceeded the threshold
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide(); // Swiped left -> Next slide
      } else {
        prevSlide(); // Swiped right -> Previous slide
      }
    }
  }

  // Initial Sync setup
  updateSlides();
});
