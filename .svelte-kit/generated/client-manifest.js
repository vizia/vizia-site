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
	() => import('./nodes/10'),
	() => import('./nodes/11')];

export const server_loads = [];

export const dictionary = {
	"/": [3],
	"/about": [4],
	"/blog": [5],
	"/blog/[...blogPage]": [6],
	"/examples": [7],
	"/faq": [8],
	"/guide": [9,[2]],
	"/guide/[...docsPage]": [10,[2]],
	"/tutorial": [11]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};