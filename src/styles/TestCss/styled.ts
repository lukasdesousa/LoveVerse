"use client";

import styled, { CSSProperties } from "styled-components";

export const ScrollAnimation = styled.div<CSSProperties>`
    :root {
  --step--2: clamp(3.13rem, 2.62rem + 2.51vw, 5.76rem);
  --step--1: clamp(3.75rem, 3.09rem + 3.29vw, 7.20rem);
  --step-0: clamp(4.50rem, 3.64rem + 4.29vw, 9.00rem);
}

body {
	background-color: #efefef;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-weight: 600;
	min-height: 400vh;
}

.marquee {
	border-bottom: 1px solid #1a1a1a;
	color: #ccc;
	font-size: var(--step-0);
	font-weight: 700;
	height: calc(170px + 4rem);
	overflow: hidden;
	position: relative;
	width: 100vw;
	
	& img {
		object-fit: cover;
		max-height: 150px;
	}
}

.track {
	height: 100%;
	overflow: hidden;
	padding: 2rem 0;
	position: absolute;
	white-space: nowrap;
	
	& .text {
		animation: marquee 50000ms linear infinite;
		align-items: center;
		display: inline-flex;
		will-change: transform;
	}
}

.-focus {
	color: #1a1a1a;
	font-weight: 900;
}

.screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper-3d {
  position: relative;
  perspective: 20vw;
  transform-style: preserve-3d;
}

.fold {
  overflow: hidden;
  width: 100vw;
  height: 80vh;
}

.fold-top {
  position: absolute;
  transform-origin: bottom center;
  left: 0;
  right: 0;
  bottom: 100%;
}

.fold-center {
	width: 100vw;
}

.fold-bottom {
  position: absolute;
  transform-origin: top center;
  right: 0;
  left: 0;
  top: 100%;
}
.fold-align {
  width: 100%;
  height: 100%;
}
.fold-bottom .fold-align {
  transform: translateY(-100%);
}
.fold-top .fold-align {
  transform: translateY(100%);
}

.fold-bottom {
  transform-origin: top center;
  transform: rotateX(120deg);
}

.fold-top {
  transform-origin: bottom center;
  transform: rotateX(-120deg);
}
`;