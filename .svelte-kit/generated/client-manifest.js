export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')];

export const server_loads = [2];

export const dictionary = {
	"/": [3],
	"/about": [4],
	"/blog": [5],
	"/blog/[...blogPage]": [6],
	"/examples": [7],
	"/faq": [8],
	"/guide/[...docsPage]": [9,[2]],
	"/tutorial": [10]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};