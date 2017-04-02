import React from 'react';
import ReactDOM from 'react-dom';

const asciiPixels = require('ascii-pixels')

export default class View extends React.Component {
	constructor(props) {
		super(props)
		// set state
		this.targetStyle = {
			minHeight: '200px',
			whiteSpace: 'pre',
			border: '1px solid black',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '72px',
			fontFamily: '"Comic Sans MS", cursive, sans-seriface',
			animation: 'rainbow 1s infinite',
		}
		// this.class

		this.outputStyle = {
			// minHeight: '400px',
			whiteSpace: 'pre',
			border: '1px solid black',
			textAlign: 'center',
		}

		this.dodrop = this.dodrop.bind(this);
		this.imageIsLoaded = this.imageIsLoaded.bind(this);
		this.output = this.output.bind(this);
		this.onDragEnter = this.onDragEnter.bind(this);
		this.onDragOver = this.onDragOver.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	dodrop(e) {
		var files = e.dataTransfer.files;
		var count = files.length;
		this.output("File Count: " + count + "\n");

		var reader = new FileReader()
		reader.onload = this.imageIsLoaded
		reader.readAsDataURL(files[0])

		for (var i = 0; i < files.length; i++) {
			const file = files[i]
			this.output(`File ${i}: ${typeof file} ${file} ${file.name} ${file.size}`)
			// output(" File " + i + ":\n(" + (typeof files[i]) + ") : <" + files[i] + " > " +
			// 			files[i].name + " " + files[i].size + "\n");
		}
	}

	imageIsLoaded(e) {
		// const img = document.createElement('img')
		const img = new Image()
		document.getElementById('output').appendChild(img)
		img.width = window.innerWidth
		// img.height = img.height*scale

		img.onload = function () {
		  var canvas = document.createElement('canvas')
		  canvas.width = img.width
		  canvas.height = img.height

		  var context = canvas.getContext('2d')
		  context.drawImage(img, 0, 0, img.width, img.height)

		  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

		  var ascii = asciiPixels(imageData)
			document.getElementById('output').textContent = ascii
			document.getElementById('output').style.fontSize = '1px'
			document.getElementById('output').style.fontFamily = 'monospace'

			var options = {
			  contrast: 128,    // range -255 to +255
			  invert: true      // invert brightness
			}
		}
		img.src = e.target.result
		// img.setAttribute('src', e.target.result)
	}

	output(text) {
		document.getElementById('output').textContent += text;
	}

	onDragEnter(e) {
		document.getElementById('output').textContent = ''
		e.stopPropagation()
		e.preventDefault()
	}

	onDragOver(e) {
		e.stopPropagation()
		e.preventDefault()
	}

	onDrop(e) {
		e.stopPropagation()
		e.preventDefault()
		this.dodrop(e)
	}

	render() {
		return <div>
			<div id="target" style={this.targetStyle}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDrop={this.onDrop}>
				drag file here reacts only pls
			</div>
			<div id="output" style={this.outputStyle}>
			</div>
		</div>
	}
}
