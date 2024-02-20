const navbar = document.querySelector('ul.navbar-nav');
const currentContainerResponse = document.getElementById('container-response');

const setActiveLink = (element) => {
  const navbarLinks = navbar.querySelectorAll('.nav-link');
  navbarLinks.forEach(link => {
    if(link.classList.contains('active')) {
      link.classList.remove('active');
    }
  });
  element.classList.add('active');
};

navbar.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('nav-link')) {

    setActiveLink(e.target);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', e.target.getAttribute('href'));

    xhr.addEventListener('readystatechange', () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        const ajaxResponse = xhr.responseText;
        const domParser = new DOMParser();
        const htmlDoc = domParser.parseFromString(ajaxResponse, "text/html");
        const docContainerResponse = htmlDoc.getElementById('container-response');
        currentContainerResponse.innerHTML = docContainerResponse.innerHTML;
      }
    });

    xhr.send();
  }
});