import Block from './Block';

export default function renderDOM(BlockPage: typeof Block) {
	const block = new BlockPage();
	const root = document.querySelector('#app');
	root!.innerHTML = '';
	root!.appendChild(block.getContent());
}
