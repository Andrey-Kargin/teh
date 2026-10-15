document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.querySelector('.header__catalog');
  const dropdown = catalog && catalog.querySelector('.catalog__dropdown');

  if (!catalog || !dropdown) return;

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  let timeout;

  const fitDropdown = () => {
    const rect = catalog.getBoundingClientRect();
    const sectionContainer = document.querySelector('main .container');
    const containerRect = sectionContainer && sectionContainer.getBoundingClientRect();
    const maxHeight = window.innerHeight - rect.bottom - 8;
    dropdown.style.position = 'fixed';
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.left = '0px';
    dropdown.style.width = window.innerWidth + 'px';
    dropdown.style.maxHeight = Math.max(240, maxHeight) + 'px';
    dropdown.style.height = 'auto';
    if (containerRect) {
      dropdown.style.paddingLeft = Math.max(0, containerRect.left) + 'px';
      dropdown.style.paddingRight = Math.max(0, window.innerWidth - containerRect.right) + 'px';
    }
  };

  const openCatalog = () => {
    if (isMobile()) return;
    clearTimeout(timeout);
    catalog.classList.add('header__catalog_opened');
    dropdown.classList.add('catalog__dropdown_active');
    fitDropdown();
  };

  const closeCatalog = () => {
    timeout = setTimeout(() => {
      catalog.classList.remove('header__catalog_opened');
      dropdown.classList.remove('catalog__dropdown_active');
    }, 120);
  };

  catalog.addEventListener('mouseenter', openCatalog);
  catalog.addEventListener('mouseleave', closeCatalog);
  dropdown.addEventListener('mouseenter', openCatalog);
  dropdown.addEventListener('mouseleave', closeCatalog);

  const tabs = dropdown.querySelectorAll('.catalog__dropdown-nav-link');
  const boxes = dropdown.querySelectorAll('.catalog__dropdown-box');

  const activateTab = (tab) => {
    tabs.forEach((item) => item.classList.remove('catalog__dropdown-nav-link_active'));
    boxes.forEach((box) => box.classList.remove('catalog__dropdown-box_active'));
    tab.classList.add('catalog__dropdown-nav-link_active');
    const targetBox = document.getElementById(tab.dataset.tab);
    if (targetBox) targetBox.classList.add('catalog__dropdown-box_active');
  };

  tabs.forEach((tab) => {
    tab.addEventListener('mouseenter', () => activateTab(tab));
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      activateTab(tab);
    });
  });

  window.addEventListener('resize', () => {
    if (isMobile()) {
      dropdown.classList.remove('catalog__dropdown_active');
      catalog.classList.remove('header__catalog_opened');
      return;
    }
    if (dropdown.classList.contains('catalog__dropdown_active')) {
      fitDropdown();
    }
  });
});
