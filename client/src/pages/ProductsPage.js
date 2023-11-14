import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductPageSearch,
  ProductPageSort,
} from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import POSTS from '../_mock/blog';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'favourites', label: 'Favourites' },
];

// ----------------------------------------------------------------------

const GET_ALL = gql`
  query GetProducts {
    allProducts {
      nodes {
        nodeId
        id
        sku
        description
        categoryId
        subcategoryId
        uomId
        categoryByCategoryId {
          description
        }
        subcategoryBySubcategoryId {
          description
        }
        uomByUomId {
          abbrev
        }
      }
    }
  }
`;

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const { loading, error, data } = useQuery(GET_ALL);

  return (
    <>
      <Helmet>
        <title> Tips | Medicine </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Medicine
        </Typography>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ProductPageSearch posts={PRODUCTS} />
          <Stack direction="row" spacing={5} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />

            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
