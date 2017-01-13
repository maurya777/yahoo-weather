import Component from '../components/Component';

export default function render (component, domElement) {
  if (!domElement || !(domElement instanceof HTMLElement)) {
      throw new Error('render needs a dom element to render html');
  }
  if (!component || !(component instanceof Component)) {
      throw new Error('render needs a component to render html');
  }
  domElement.innerHTML = component.render();
}
