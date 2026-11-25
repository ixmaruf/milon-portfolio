/**
 * Milon Official Portfolio — Interactive Script
 * Swiss Editorial Grid System // Strictly zero unicode emojis.
 */

(function () {
  'use strict';

  // --- Proof Gallery Data ---
  var proofData = [
    {
      idx: 0,
      src: 'images/image1.jpg',
      tag: '$WAL CLAIM PROOF',
      title: 'Walrus $WAL Token 50,000 BDT to 500,000 BDT Claims',
      desc: 'Walrus Protocol testnet community distribution proof. Members claimed substantial rewards based on early step-by-step guides.'
    },
    {
      idx: 1,
      src: 'images/image2.jpg',
      tag: 'SOLV & NODEPAY',
      title: 'Node Runners & DeFi Staking Distributions ($80 - $218)',
      desc: 'Community members sharing listing balances following long-term participation in node runners and Solv staking campaigns.'
    },
    {
      idx: 2,
      src: 'images/image3.jpg',
      tag: 'MEXC AIRDROP',
      title: 'MEXC Inflows & Celestia Spot Account Rewards',
      desc: 'Exchange airdrop registration bonuses and early testnet staking rewards received directly to verified member accounts.'
    },
    {
      idx: 3,
      src: 'images/image4.jpg',
      tag: 'SOLV FINANCE',
      title: '$218.40 SOLV Token Direct Allocation',
      desc: 'Verified on-chain reward allocation for liquidity provision and testnet participation in decentralized finance protocols.'
    },
    {
      idx: 4,
      src: 'images/image5.jpg',
      tag: 'BINANCE USUAL',
      title: '$153.80 USUAL Pre-Market Launchpool Payout',
      desc: 'Pre-market launchpool reward proof credited to community member Binance spot wallet following strategic farming guides.'
    },
    {
      idx: 5,
      src: 'images/image6.jpg',
      tag: 'DAILY FARMING',
      title: '$20 USDT Recurring Account Distributions',
      desc: 'Consistent daily task and testnet execution rewards credited across tier-1 exchange accounts.'
    },
    {
      idx: 6,
      src: 'images/image7.jpg',
      tag: 'EXCHANGE FUNDING',
      title: '0.0556 BTC ($4,865.63) Funding Account Proof',
      desc: '12,783.00 WAL tokens valued at $4,854.82 deposited into exchange funding wallet.'
    },
    {
      idx: 7,
      src: 'images/image8.jpg',
      tag: 'TESTIMONIAL PROOF',
      title: '$3,824.37 USDT Direct User Profit',
      desc: 'Member testimonial thanking Milon for life-changing family rewards from consistent airdrop execution.'
    }
  ];

  var currentProofIndex = 0;

  // --- DOM Elements ---
  var lightboxModal = document.getElementById('lightboxModal');
  var lightboxBackdrop = document.getElementById('lightboxBackdrop');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxTag = document.getElementById('lightboxTag');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxDesc = document.getElementById('lightboxDesc');
  var lbCounter = document.getElementById('lbCounter');
  var lbPrevBtn = document.getElementById('lbPrevBtn');
  var lbNextBtn = document.getElementById('lbNextBtn');

  var privacyBlurToggle = document.getElementById('privacyBlurToggle');
  var blurToggleText = document.getElementById('blurToggleText');
  var proofCards = document.querySelectorAll('.work-card, .proof-card');

  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  // --- Lightbox Functions ---
  function openLightbox(index) {
    if (index < 0) index = proofData.length - 1;
    if (index >= proofData.length) index = 0;
    currentProofIndex = index;

    var item = proofData[currentProofIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTag.textContent = item.tag;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lbCounter.textContent = (currentProofIndex + 1) + ' / ' + proofData.length;

    lightboxModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    lightboxModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function nextProof() {
    openLightbox(currentProofIndex + 1);
  }

  function prevProof() {
    openLightbox(currentProofIndex - 1);
  }

  // --- Attach Lightbox Event Listeners ---
  proofCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var idx = parseInt(card.getAttribute('data-idx'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx);
      }
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var idx = parseInt(card.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) {
          openLightbox(idx);
        }
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  if (lbNextBtn) {
    lbNextBtn.addEventListener('click', nextProof);
  }

  if (lbPrevBtn) {
    lbPrevBtn.addEventListener('click', prevProof);
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', function (e) {
    if (lightboxModal && !lightboxModal.hasAttribute('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextProof();
      } else if (e.key === 'ArrowLeft') {
        prevProof();
      }
    }
  });

  // --- Privacy Blur Toggle ---
  var isBlurred = false;
  if (privacyBlurToggle) {
    privacyBlurToggle.addEventListener('click', function () {
      isBlurred = !isBlurred;
      document.body.classList.toggle('privacy-blur-on', isBlurred);
      privacyBlurToggle.setAttribute('aria-pressed', isBlurred ? 'true' : 'false');
      if (blurToggleText) {
        blurToggleText.textContent = isBlurred ? 'REVEAL NUMBERS' : 'TOGGLE PRIVACY BLUR';
      }
    });
  }

  // --- Proof Category Filtering (Inspired by User Reference Images 3 & 7) ---
  var filterButtons = document.querySelectorAll('.proof-filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) {
          b.classList.remove('bg-[#0B0E14]', 'text-white');
          b.classList.add('bg-white', 'text-[#0B0E14]');
        });
        btn.classList.remove('bg-white', 'text-[#0B0E14]');
        btn.classList.add('bg-[#0B0E14]', 'text-white');

        proofCards.forEach(function (card) {
          var category = card.getAttribute('data-category') || 'all';
          if (filter === 'all' || category.indexOf(filter) !== -1) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Mobile Drawer Navigation ---
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isHidden = mobileMenu.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', !isHidden ? 'true' : 'false');
    });

    var mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // --- Contact Terminal Submission ---
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var projectName = document.getElementById('projectName').value.trim();
      var contactHandle = document.getElementById('contactHandle').value.trim();
      var inquiryType = document.getElementById('inquiryType').value;
      var projectScope = document.getElementById('projectScope').value.trim();

      if (!projectName || !contactHandle || !projectScope) {
        if (formStatus) {
          formStatus.className = 'form-status status-error';
          formStatus.textContent = '[ERROR] Please complete all required fields before initiating dispatch.';
        }
        return;
      }

      var formattedMsg = 'Hi Milon, I am reaching out regarding ' + inquiryType +
        ' from project ' + projectName + '.\n' +
        'My handle: ' + contactHandle + '\n' +
        'Scope: ' + projectScope;

      var telegramUrl = 'https://t.me/Milon86544?text=' + encodeURIComponent(formattedMsg);

      if (formStatus) {
        formStatus.className = 'form-status status-success';
        formStatus.innerHTML =
          '<strong>[TRANSMISSION COMPILED]</strong> Opening direct verified Telegram session with @Milon86544... ' +
          '<a href="' + telegramUrl + '" target="_blank" rel="noopener noreferrer" style="color:var(--red-accent); text-decoration:underline; font-weight:700; margin-left:8px;">CLICK TO OPEN TELEGRAM &rarr;</a>';
      }

      setTimeout(function () {
        window.open(telegramUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    });
  }

  // --- Header Border on Scroll ---
  var siteHeader = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (siteHeader) {
      if (window.pageYOffset > 40) {
        siteHeader.style.borderBottomColor = 'rgba(11, 12, 16, 0.15)';
        siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
      } else {
        siteHeader.style.borderBottomColor = 'var(--border)';
        siteHeader.style.boxShadow = 'none';
      }
    }
  }, { passive: true });


  // --- Custom Fluid Cursor (Desktop Fine Pointer Only) ---
  var cursorDot = document.getElementById('customCursorDot');
  var cursorRing = document.getElementById('customCursorRing');
  if (cursorDot && cursorRing && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    var mouseX = -100, mouseY = -100;
    var ringX = -100, ringY = -100;
    var cursorVisible = false;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = 'translate3d(' + (mouseX - 4) + 'px, ' + (mouseY - 4) + 'px, 0)';
      if (!cursorVisible) {
        ringX = mouseX;
        ringY = mouseY;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        cursorVisible = true;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      cursorVisible = false;
    });

    function animateCursorRing() {
      if (cursorVisible) {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        var halfW = cursorRing.offsetWidth / 2;
        var halfH = cursorRing.offsetHeight / 2;
        cursorRing.style.transform = 'translate3d(' + (ringX - halfW) + 'px, ' + (ringY - halfH) + 'px, 0)';
      }
      requestAnimationFrame(animateCursorRing);
    }
    requestAnimationFrame(animateCursorRing);

    var interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .proof-card');
    interactiveEls.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursorRing.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { cursorRing.classList.remove('cursor-hover'); });
    });
  }

})();
