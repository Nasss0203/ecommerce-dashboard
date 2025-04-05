interface IUploadImage {
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	preview: string | null;
}

const UploadImage = ({ handleFileChange, preview }: IUploadImage) => {
	return (
		<div className='flex flex-col items-center justify-center w-full'>
			<label
				htmlFor='dropzone-file'
				className='flex flex-col items-center justify-center w-full h-[400px] border-2  rounded-lg cursor-pointer dark:bg-background '
			>
				<div className='flex flex-col items-center justify-center pt-5 pb-6'>
					{preview ? (
						<div className='w-full h-[400px] p-5'>
							<img
								src={preview}
								alt='Uploaded Preview'
								className='flex-shrink-0 object-cover w-full h-full'
							/>
						</div>
					) : (
						<>
							<svg
								className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 20 16'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
								/>
							</svg>
							<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
								<span className='font-semibold'>
									Click to upload
								</span>{" "}
								or drag and drop
							</p>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								SVG, PNG, JPG or GIF (MAX. 800x400px)
							</p>
						</>
					)}
				</div>
				<input
					id='dropzone-file'
					type='file'
					accept='image/*'
					className='hidden'
					onChange={handleFileChange}
				/>
			</label>
		</div>
	);
};

export default UploadImage;
