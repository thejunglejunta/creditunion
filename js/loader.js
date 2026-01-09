"use strict";

class bankloader {
	
	#loader;
	
	#style = {
		inset: 0,
		borderRadius: 0
	}
	
	#parent;
	
	#parentStyle = {}
	
	constructor() {
		
		let img = $("[data-bankloader]").attr('data-bankloader');
		
		let html = `
			<div class='card-body' style='display: flex; align-items: center; justify-content: center; width: 100%;'>
				<div class='loader-content text-center'>
					<div class="mb-3">
						<h2>
							<small>
								<span style="color: rgb(0, 153, 0);" data-title></span>
							</small>
						</h2>
					</div>
					<div class="style1 my-3" style="visibility: visible;">
						<b>
							<font face="Courier New, Courier, monospace" size="3" class='text-uppercase' data-info>
								YOUR TRANSFER DATA IS BEING PROCESSED
							</font>
						</b>
					</div>
					<img src='${img}' class='img-responsive img-fluid'>
				</div>
			</div>
		`;
		
		let el = document.createElement('div');
		el.id = 'bankloader';
		el.className = 'card';
		el.innerHTML = html;
		
		this.#loader = el;
		
	}
	
	remove() {
		if( this.#loader && this.#loader.parentElement ) {
			this.#loader.parentElement.removeChild( this.#loader );
			this.#parentFix( false );
		};
	}
	
	pop( el ) {
		let self = this;
		self.remove();
		this.#parent = $(el).get(0);
		if( this.#parent ) {
			this.#style.position = 'absolute';
			this.#style.zIndex = 100;
		} else {
			this.#style.position = 'fixed';
			this.#style.zIndex = 99999;
		}
		let fixed = undefined;
		if( !this.#parent ) {
			this.#parent = $('body').get(0);
		} else fixed = true;
		$.each(this.#style, function(key, value) {
			self.#loader.style[key] = value;
		});
		this.#parentFix( fixed )	
		this.#parent.appendChild( this.#loader );
	}
	
	update( key, value ) {
		let el = $(this.#loader).find(`[data-${key}]`);
		el.html( value );
	}
	
	#parentFix( bool ) {
		if( bool === undefined ) return;
		let style = {
			position: 'relative',
			height: '600px',
			overflow: 'hidden'
		};
		let self = this;
		$.each(style, function(key, value) {
			if( bool ) {
				let reserve = self.#parent.style[key]
				self.#parentStyle[key] = ( reserve == '' ? null : reserve );
				self.#parent.style[key] = value;
			} else {
				self.#parent.style[key] = self.#parentStyle[key];
			};
		});
	}
	
};
