import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

export const NekomimiPage: React.VFC = () => {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [image, setImage] = useState<HTMLImageElement | null>(null);
	const [crop, setCrop] = useState<Partial<Crop>>({unit: '%', width: 100, aspect: 1 / 1});
	const [completedCrop, setCompletedCrop] = useState<Crop>();

	const previewCanvasRef = useRef<HTMLCanvasElement>(null);

	const onChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files === null || e.target.files.length === 0) return;
		const reader = new FileReader();
		reader.addEventListener('load', () => setBlobUrl(reader.result as string));
		reader.readAsDataURL(e.target.files[0]);
		setCrop({unit: '%', width: 100, aspect: 1 / 1});
	};

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !image) {
			return;
		}

		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const pixelRatio = window.devicePixelRatio;

		canvas.width = crop.width * pixelRatio * scaleX;
		canvas.height = crop.height * pixelRatio * scaleY;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY
		);
	}, [completedCrop]);

	return (
		<div className="fade">
			<h2>ネコミミアジャスター</h2>
			<input type="file" className="input-field" accept="image/*" onChange={onChangeFile} />
			{blobUrl && (
				<div className="row mt-2">
					<div className="col-8 col-12-sm">
						<ReactCrop src={blobUrl} crop={crop}
							onImageLoaded={(i) => setImage(i)}
							onChange={(c) => setCrop(c)}
							onComplete={(c) => setCompletedCrop(c)}
						/>
					</div>
					<div className="col-4 col-12-sm">
						<h3 className="text-100 text-bold">プレビュー</h3>
						<div className="cat mt-4 mb-2" style={{position: 'relative', width: 96, height: 96}}>
							<canvas
								ref={previewCanvasRef}
								className="circle"
								style={{
									position: 'absolute',
									inset: 0,
									width: '100%',
									height: '100%',
									zIndex: 100,
								}}
							/>
						</div>
						<button className="btn primary">アップロード</button>
					</div>
				</div>
			)}
		</div>
	);
};

