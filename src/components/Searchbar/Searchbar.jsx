import { useState, useEffect, useRef, useCallback } from 'react';

import SearchForm from 'components/SearchForm';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { getImages } from 'api/api';

function Searchbar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const firstRender = useRef(true);

  useEffect(() => {
    async function fetchProductsList() {
      setLoading(true);
      setError(false);

      try {
        const { data } = await getImages(query, page);
        const { totalHits, hits } = data;

        if (page === 1) {
          setItems(hits);
          setTotal(totalHits);
        }
        setItems([...hits]);
        setTotal(totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (!firstRender.current) {
      fetchProductsList();
    } else {
      firstRender.current = false;
    }
  }, [page, query]);

  const setSearchQuery = useCallback(
    ({ query }) => {
      setQuery(prevState => {
        if (prevState.query !== query) {
          setPage(1);
          setItems([]);
          return query;
        }
      });
    },
    [setItems]
  );

  function loadMore() {
    setPage(page + 1);
  }
  const getImgObj = useCallback(
    ({ largeImageURL, tags }) => {
      setModalOpen(true);
      setModalContent({ largeImageURL, tags });
    },
    [setModalContent]
  );

  function closeModal() {
    setModalOpen(false);
  }

  const { largeImageURL, tags } = modalContent;
  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} width="900" />
        </Modal>
      )}

      <SearchForm onSubmit={setSearchQuery} />
      {error && <p>Can't loaded images</p>}
      {loading && <Loader />}

      <ImageGallery items={items} onClick={getImgObj} />
      {!loading && items.length >= 12 && page * 12 <= total && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
}

export default Searchbar;
