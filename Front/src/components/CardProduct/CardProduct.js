import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  CarouselControl,
  CarouselCaption,
  CarouselItem,
  Carousel,
} from "reactstrap";

import { useCart } from "components/UseCart/UseCart";

import { useProduct } from "components/ProductContext/ProductContext";

function CardProduct({ category, products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { addToCart } = useCart();
  const { setProduct } = useProduct();
  const [animating, setAnimating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const history = useHistory();

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === products.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handleProdutoClick = (product) => {
    setSelectedProduct(product);
    if (product.amount === 0) {
      return;
    }

    product.amount = product.amount - 1;
    addToCart(product);
  };

  const ProdutoInfo = (product) => {
    setProduct(product);
    history.push("/user/Produtos-info", { selectedProduct: product });
  };

  const slides = Array.isArray(products)
    ? products.map((product) =>
      <CarouselItem key={product.id}>
        <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
        <CarouselCaption captionText={product.name} captionHeader={<span style={{ color: 'red' }}>{product.price}</span>} />
        <div style={{ position: 'absolute', top: 10, width: '100%', right: '-35%', textAlign: 'center', zIndex: 10 }}>
          <Button onClick={() => handleProdutoClick(product)}>
            <i className="tim-icons icon-cart" />
          </Button>
        </div>
        <div style={{ position: 'relative', button: 0, width: '100%', right: '-35%', textAlign: 'center', zIndex: 10 }}>
          <Button onClick={() => ProdutoInfo(product)}>
            <i className="tim-icons icon-alert-circle-exc" />
          </Button>
        </div>
      </CarouselItem>
    )
    : null;

  return (
    <Row>
      <Col md="12">
        <Card>
          <Col>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              interval={false}
              slide={false}
              className="custom-carousel"
            >
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

export default CardProduct;
