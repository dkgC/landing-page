const NAV_TABS_SELECTOR = '.nav-tabs';

function handleTabClick(e) {
  const target = e.target.closest('li');
  if (target && !target.classList.contains('active') && !target.getAttribute('data-no-change')) {
    const tabBar = target.closest(NAV_TABS_SELECTOR);
    const allTabs = tabBar.querySelectorAll('li');

    allTabs.forEach(tab => tab.classList.remove('active'));
    target.classList.add('active');
  }
}

export function initTabBar() {
  const tabBar = document.querySelector(NAV_TABS_SELECTOR);
  tabBar && tabBar.addEventListener('click', handleTabClick)
}
