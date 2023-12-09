import React from 'react';
import { useState, useEffect } from 'react';

function ContentRowTop() {

	const [products, setProducts] = useState({ count: 0, });
	const [users, setUsers] = useState([]);
	const [lastProduct, setLastProduct] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/products/")
			.then(result => result.json())
			.then(data => setProducts(data))
			.catch(error => console.log(error))

		fetch("http://localhost:3000/api/users/")
			.then(result => result.json())
			.then(data => setUsers(data))
			.catch(error => console.log(error))
	}, [])

	useEffect(() => {
		console.log(products);
		if (products && products.products) {
			let link = products.products[products.products.length - 1].detail;
			fetch(link)
				.then(result => result.json())
				.then(data => setLastProduct(data.product))
				.catch(error => console.log(error))
		}

	}, [products])

	return (
		<React.Fragment>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
				</div>

				{/*<!-- Content Row Movies-->*/}
				<div className="row">


					{/*<!-- Total awards -->*/}
					<div className="col-md-4 mb-4">
						<div className="card border-left-success shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-success text-uppercase mb-1"> Total users</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{!users.total && <p>0 (No users)</p>}
											{users.total && users.total === 1 && <p>{users.total} User</p>}
											{users.total && users.total > 1 && <p>{users.total} Users</p>}
										</div>
									</div>
									<div className="col-auto">
										{/* <i className="fas fa-user fa-2x text-gray-300"></i> */}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/*<!-- Movies in Data Base -->*/}
					<div className="col-md-4 mb-4">
						<div className="card border-left-primary shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Products in Data Base</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{!products.count && <p>0 (No products)</p>}
											{products.count && products.count === 1 && <p>{products.count} Product</p>}
											{products.count && products.count > 1 && <p>{products.count} Products</p>}
										</div>
									</div>
									<div className="col-auto">

									</div>
								</div>
							</div>
						</div>
					</div>

					{/*<!-- Actors quantity -->*/}
					<div className="col-md-4 mb-4">
						<div className="card border-left-warning shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Categories quantity
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{!products.countByCategory && <p>0 (No products)</p>}
											{products.countByCategory && products.countByCategory.length === 1 && <p>{products.countByCategory.length} Category</p>}
											{products.countByCategory && products.countByCategory.length > 1 && <p>{products.countByCategory.length} Categories</p>}
										</div>
									</div>
									<div className="col-auto">
										{/* <i className="fas fa-user fa-2x text-gray-300"></i> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*<!-- End movies in Data Base -->*/}


				{/*<!-- Content Row Last Movie in Data Base -->*/}
				<div className="row">
					{/*<!-- Last Movie in DB -->*/}
					<div className="col-lg-6 mb-4">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h5 className="m-0 font-weight-bold text-gray-800">Last product created in Data Base</h5>
							</div>
							<div className="card-body">
								{
									!lastProduct &&
									<>
										<div className="text-center">
											<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 30 + 'rem' }} src="" alt="sin imagen" />
										</div>
										<p>Error al cargar producto...</p>
									</>
								}
								{
									lastProduct &&
									<>
										<div className="text-center">
											<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 30 + 'rem' }} src={"/productImages/" + lastProduct.image} alt={lastProduct.name} />
										</div>
										<p>{lastProduct.name}</p>
										<p>{lastProduct.description}</p>
										{
											lastProduct.discount > 0 &&
											<p>${lastProduct.price - (lastProduct.price * (lastProduct.discount / 100))} {lastProduct.discount}%OFF!</p>
										}
										{lastProduct.discount === 0 && <p>${lastProduct.price}</p>}
										<a className="btn btn-dark" target="_blank" rel="nofollow" href="/">View product details</a>
									</>
								}
							</div>
						</div>
					</div>
					{/*<!-- End content row last movie in Data Base -->*/}

					{/*<!-- Genres in DB -->*/}
					<div className="col-lg-6 mb-4">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h5 className="m-0 font-weight-bold text-gray-800">Categories in Data Base</h5>
							</div>
							<div className="card-body">
								<div className="row">
									{
										!products.countByCategory &&
										<>
											<div className="col-lg-6 mb-4">
												No categories...
											</div>
										</>
									}
									{
										products.countByCategory &&
										products.countByCategory.map((category) => {
											return (
												<>
													<div className="col-lg-6 mb-4">
														<div className="card bg-gradient-dark text-white shadow">
															<div className="card-body">
																{category.name} - Total: {category.count}
															</div>
														</div>
													</div>
												</>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-12 mb-4">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h5 className="m-0 font-weight-bold text-gray-800">Products in Data Base</h5>
							</div>
							<div className="card-body">
								<div className="row">
									{
										!products.products &&
										<>
											<div className="col-lg-6 mb-4">
												No products...
											</div>
										</>
									}
									{
										products.products &&
										products.products.map((product) => {
											return (
												<>
													<div className="col-lg-6 mb-4">
														<div className="card bg-gradient-dark text-white shadow">
															<div className="card-body">
																ID: {product.id} - {product.name}
															</div>
														</div>
													</div>
												</>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*<!--End Content Row Top-->*/}

		</React.Fragment>
	)

}
export default ContentRowTop;