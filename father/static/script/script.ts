class canvas {
	public constructor(element: HTMLElement, config: canvasconfig) {
		const canvas = document.createElement('canvas')
		this.config = config
		this.canvas = <CanvasRenderingContext2D>canvas.getContext('2d')
		canvas.width = element.offsetWidth
		canvas.height = element.offsetHeight
		element.appendChild(canvas)
		this.resize(element, canvas)
		this.loadimage()
		requestAnimationFrame(this.restore)
	}

	public canvas: CanvasRenderingContext2D
	public config: canvasconfig
	public images: images[] = []
	public imgs: image[] = []
	public loading: boolean = false

	public resize(element: HTMLElement, canvas: HTMLCanvasElement): void {
		addEventListener('resize', function () {
			canvas.width = element.offsetWidth
			canvas.height = element.offsetHeight
		})
	}

	public loadimage(): void {
		this.config.images.forEach((img, index) => {
			const image = new Image()
			image.src = img
			this.images.push({ image: image, load: false })
		})
		this.images.forEach(image => {
			image.image.onload = () => {
				image.load = true
			}
		});

		for (let index = 0; index < parseInt((innerWidth / 5 + innerHeight / 5).toFixed()); index++) {
			const rerotate = Math.random() - .5 > 0 ? 1 : -1
			this.imgs.push({
				rotate: Math.PI / 180 * Math.random(),
				rerotate: (Math.random() / 20 + .008) * rerotate,
				scale: Math.random() / 8 + .2,
				imgnum: Math.round(Math.random() * (this.images.length - 1)),
				x: Math.random() * innerWidth * 2 - .5 * innerWidth,
				rex: Math.random() / 3 - 1 / 6,
				y: Math.random() * innerHeight * 3 - innerHeight,
				rey: Math.random() / 2 + 1
			})
		}
	}

	public showimage(config: image): void {
		this.canvas.save()
		config.rotate += config.rerotate
		config.x += config.rex
		config.y += config.rey
		if (config.x > 2 * innerWidth) {
			config.x = -innerWidth
			config.imgnum = Math.round(Math.random() * (this.images.length - 1))
		}
		if (config.y > 2 * innerHeight) {
			config.y = -innerHeight
			config.x = Math.random() * innerWidth * 2 - .5 * innerWidth
			config.imgnum = Math.round(Math.random() * (this.images.length - 1))
		}
		this.canvas.translate(config.x + this.images[config.imgnum].image.width / 2, config.y + this.images[config.imgnum].image.height / 2)
		this.canvas.scale(config.scale, config.scale)
		this.canvas.rotate(config.rotate)
		this.canvas.translate(-(config.x + this.images[config.imgnum].image.width / 2), -(config.y + this.images[config.imgnum].image.height / 2))
		this.canvas.drawImage(this.images[config.imgnum].image, config.x, config.y)
		this.canvas.restore()
	}

	public restore = () => {
		if (!this.loading) {
			let load: boolean = true
			this.images.forEach(image => {
				if (!image.load) return load = false
			});
			if (load) {
				this.loading = true
				setTimeout(this.load, 500);
			}
		}
		this.canvas.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height)
		this.imgs.forEach(img => {
			this.showimage(img)
		})
		requestAnimationFrame(this.restore)
	}

	public load() {
		console.log(this)
	}
}

interface canvasconfig {
	images: string[]
	number: number
}

interface image {
	rotate: number,
	rerotate: number,
	scale: number,
	imgnum: number,
	x: number,
	rex: number
	y: number
	rey: number
}

interface images {
	image: HTMLImageElement
	load: boolean
}