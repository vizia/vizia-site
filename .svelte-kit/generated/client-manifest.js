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
	() => import('./nodes/11'),
	() => import('./nodes/12')];

export const server_loads = [];

export const dictionary = {
	"/": [3],
	"/about": [4],
	"/blogs": [5],
	"/blogs/[...blogPage]": [6],
	"/examples": [7],
	"/faq": [8],
	"/guide": [9],
	"/guide/[...docsPage]": [10],
	"/tutorials": [11,[2]],
	"/tutorials/[...tutorialPage]": [12,[2]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};