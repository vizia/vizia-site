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
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')];

export const server_loads = [2,3];

export const dictionary = {
	"/": [4],
	"/about": [5],
	"/blogs": [6],
	"/blogs/[...blogPage]": [7],
	"/examples": [8],
	"/faq": [9],
	"/guide": [10],
	"/guide/[...docsPage]": [11],
	"/tutorials": [12,[2]],
	"/tutorials/[tutorial]": [13,[2,3]],
	"/tutorials/[tutorial]/[...tutorialPage]": [14,[2,3]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};