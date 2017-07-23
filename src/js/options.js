'use strict';

const elType = document.getElementById('type');
const elUrlOption = document.getElementById('url_option');
const elUrl = document.getElementById('url');

/**
 * @exports options
 */
const options = {
  toggleUrlOption () {
    elUrlOption.style.display = (elType.options[elType.selectedIndex].value == 'custom_url') ? 'block' : 'none';
  },

  /**
   * Fired when the initial HTML document has been completely loaded and parsed. This method is used to load the
   * current options.
   *
   * @returns {void}
   */
  async load () {
    const option = await browser.storage.local.get({
      type : 'custom_url',
      url : ''
    });

    elType.querySelector('[value="' + option.type + '"]').selected = true;
    elUrl.value = option.url;
    options.toggleUrlOption();
  }
};

document.addEventListener('DOMContentLoaded', options.load);

elType.addEventListener('change', (e) => {
  browser.storage.local.set({ type : e.target.value });
  options.toggleUrlOption();
});

elUrl.addEventListener('input', (e) => {
  browser.storage.local.set({ url : e.target.value });
});
