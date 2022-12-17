import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetch } from '../services/imgApi';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

Notify.init({
  useIcon: false,
  fontSize: '20px',
  position: 'right-top',
  width: '350px',
  height: '35px',
  clickToClose: true,
});

export class App extends Component {
  state = {
    query: null,
    gallery: false,
    pictures: [],
    page: 1,
    pages: null,
    loader: false,
    modal: false,
    large: null,
    alt: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({
        loader: true,
      });

      fetch(query, page)
        .then(({ pictures, pages }) => {
          if (pictures.length === 0) {
            Notify.warning('Oppps.. bad query');
            this.setState({
              gallery: false,
            });
            return;
          }

          this.setState({
            pictures: [...prevState.pictures, ...pictures],
            pages,
            gallery: true,
          });
        })
        .catch(error => Notify.warning('Oppps.. bad query'))
        .finally(
          this.setState({
            loader: false,
          })
        );
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.input.value;

    if (query.trim() === '') {
      Notify.warning('Oppps.. please type query');
      return;
    }

    this.setState(prevState => {
      const pictures = prevState.pictures;
      pictures.length = 0;

      return {
        pictures,
        query,
        page: 1,
      };
    });
  };

  onClick = () => {
    this.setState(prevState => {
      const page = prevState.page + 1;
      return { page };
    });
  };

  onClickModal = (large, alt) => {
    window.addEventListener('keydown', this.closeByEsc);

    this.setState({
      large,
      modal: true,
      alt,
    });
  };

  closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      this.setState({
        modal: false,
      });

      window.removeEventListener('keydown', this.closeByEsc);
    }
  };

  modalClose = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.setState({
      modal: false,
    });
  };

  render() {
    const { onSubmit, onClick, onClickModal, modalClose } = this;
    const { gallery, pictures, page, pages, loader, modal, large, alt } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {gallery && (
          <ImageGallery>
            {pictures.map(({ id, small, large, alt }) => {
              return (
                <ImageGalleryItem
                  onClickModal={onClickModal}
                  id={id}
                  small={small}
                  large={large}
                  alt={alt}
                  key={id}
                />
              );
            })}
          </ImageGallery>
        )}
        {loader && <Loader />}
        {gallery && page < pages && <Button onClick={onClick} />}
        {modal && <Modal alt={alt} large={large} modalClose={modalClose} />}
      </>
    );
  }
}
