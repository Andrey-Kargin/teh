document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.querySelector('.header__catalog');
  const dropdown = catalog && catalog.querySelector('.catalog__dropdown');

  if (!catalog || !dropdown) return;

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  const fitDropdown = () => {
    const headerRow = catalog.closest('.header__main') || catalog.closest('.header');
    const rowRect = (headerRow || catalog).getBoundingClientRect();
    const top = rowRect.bottom;
    const sectionContainer = document.querySelector('main .container');
    const containerRect = sectionContainer && sectionContainer.getBoundingClientRect();
    const maxHeight = Math.max(200, window.innerHeight - top);
    dropdown.style.position = 'fixed';
    dropdown.style.top = top + 'px';
    dropdown.style.left = '0px';
    dropdown.style.width = window.innerWidth + 'px';
    dropdown.style.maxHeight = maxHeight + 'px';
    dropdown.style.height = 'auto';
    if (containerRect) {
      dropdown.style.paddingLeft = Math.max(0, containerRect.left) + 'px';
      dropdown.style.paddingRight = Math.max(0, window.innerWidth - containerRect.right) + 'px';
    }
    const usedHeight = Math.min(dropdown.scrollHeight, maxHeight);
    dropdown.style.height = usedHeight + 'px';
  };

  const lockPageScroll = () => {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) {
      document.body.style.paddingRight = scrollbar + 'px';
    }
  };

  const unlockPageScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const isOpen = () => dropdown.classList.contains('catalog__dropdown_active');

  const openCatalog = () => {
    if (isMobile()) return;
    catalog.classList.add('header__catalog_opened');
    dropdown.classList.add('catalog__dropdown_active');
    lockPageScroll();
    fitDropdown();
  };

  const closeCatalog = () => {
    catalog.classList.remove('header__catalog_opened');
    dropdown.classList.remove('catalog__dropdown_active');
    unlockPageScroll();
  };

  const toggleCatalog = () => {
    if (isOpen()) {
      closeCatalog();
    } else {
      openCatalog();
    }
  };

  catalog.addEventListener('click', (event) => {
    if (event.target.closest('.catalog__dropdown')) return;
    event.preventDefault();
    event.stopPropagation();
    toggleCatalog();
  });

  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    if (catalog.contains(event.target)) return;
    closeCatalog();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeCatalog();
    }
  });

  const tabs = dropdown.querySelectorAll('.catalog__dropdown-nav-link');
  const boxes = dropdown.querySelectorAll('.catalog__dropdown-box');

  const activateTab = (tab) => {
    tabs.forEach((item) => item.classList.remove('catalog__dropdown-nav-link_active'));
    boxes.forEach((box) => box.classList.remove('catalog__dropdown-box_active'));
    tab.classList.add('catalog__dropdown-nav-link_active');
    const targetBox = document.getElementById(tab.dataset.tab);
    if (targetBox) targetBox.classList.add('catalog__dropdown-box_active');
    if (isOpen()) fitDropdown();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('mouseenter', () => {
      if (isOpen()) activateTab(tab);
    });
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      activateTab(tab);
    });
  });

  window.addEventListener('resize', () => {
    if (isMobile()) {
      closeCatalog();
      return;
    }
    if (isOpen()) {
      fitDropdown();
    }
  });
});
