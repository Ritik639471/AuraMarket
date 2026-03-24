import { useParams } from 'react-router-dom';
import ProductZoom from "../../components/ProductZoom";

const API_URL = import.meta.env.VITE_API_URL || '';

import "./style.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = React.useState(null);

    React.useEffect(() => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div className="container">Loading product details...</div>;
    return (
        <>
            <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <div className="container">
                    <div className="breadcrumbs">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/" className="link">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/"
                                className="link"
                            >
                                {product.category}
                            </Link>
                        </Breadcrumbs>
                    </div>
                </div>
            </div>

            <section style={{ paddingLeft: '80px', paddingRight: '80px', paddingTop: '20px', background: '#fff', display: 'flex', justifyContent: 'space-between', gap: '16px', width: '100%' }}>
                <div className="container" style={{ display: 'flex', gap: '16px', width: '40%' }}>
                    <div className="product-zoom-container">
                        <ProductZoom image={product.image} />
                    </div>
                </div>
                <div className="product-details-container" style={{ width: '60%', paddingTop: '10px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>{product.name}</h1>
                    <div style={{ display: 'flex', gap: '16px', justifyItems: 'center' ,marginBottom:'10px'}}>
                        <span style={{ fontSize: '14px', fontWeight: '200', color: 'grey', marginBottom: '10px' }}>
                            Brands : <span style={{ fontWeight: '500', color: '#000', opacity: '0.75' }}>Premium</span>
                        </span>

                        <Rating name="size-small" defaultValue={5} size="small" readOnly />

                        <span style={{ fontSize: '13px', cursor: "pointer" }}>
                            Review (5)
                        </span>
                    </div>

                    <div className="product-price">
                        <span className="prod-new-price">${product.price}</span>
                    </div>

                    <p style={{fontSize:'16px',lineHeight:'25px'}}>
                        {product.description}
                    </p>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;