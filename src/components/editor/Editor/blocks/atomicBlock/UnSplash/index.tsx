import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { EditorState, ContentBlock, SelectionState, Modifier } from 'draft-js';

import {
  getBlockDeletedEditorState,
  getReplacedEntityDataEditorState,
} from '@/utils/draft';
import api from '@/apiFetch';

import styles from './style.module.scss';
import SearchResults from './SearchResults';
import UnsplashImage from './UnsplashImage';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  block: ContentBlock;
  unsplashImageInfo: any;
};

type SearchResultData = {
  results: any[];
  totalImageNumber: number;
  totalPages: number;
};

export default function UnSplash({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  block,
  unsplashImageInfo,
}: Props) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [
    searchResultData,
    setSearchResultData,
  ] = useState<SearchResultData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchResults = searchResultData?.results;
  const totalImageNumber = searchResultData?.totalImageNumber;
  const totalPages = searchResultData?.totalPages;

  useEffect(() => {
    if (!unsplashImageInfo) {
      setIsEditorReadOnly(true);
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  }, []);

  useEffect(() => {
    const searchInputValue = searchInputRef.current?.value ?? '';
    if (searchInputValue !== '') {
      updateSearchResults({ keyword: searchInputValue, currentPage });
    }
  }, [currentPage]);

  const onKeyDownHandler = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      const searchInputValue = searchInputRef.current?.value ?? '';
      await updateSearchResults({ keyword: searchInputValue });
    }
  };

  const updateSearchResults = async ({
    keyword,
    currentPage,
  }: {
    keyword: string;
    currentPage?: number;
  }) => {
    const data = await api.unsplash.getPhotos({ keyword, currentPage });

    setSearchResultData(data);
  };

  const onBlurHandler = async (e) => {
    setIsEditorReadOnly(false);
    const newEditorState = getBlockDeletedEditorState({ editorState, block });
    setEditorState(newEditorState);
  };

  const onFocusHandler = async (e) => {
    setIsEditorReadOnly(true);
  };

  const onSelectPhotoHandler = ({
    unsplashImageInfo,
  }: {
    unsplashImageInfo: any;
  }) => {
    const blockEntityKey = block.getEntityAt(0);
    const newEdtitorState = getReplacedEntityDataEditorState({
      data: { unsplashImageInfo },
      editorState,
      entityKey: blockEntityKey,
    });

    setEditorState(newEdtitorState);
    setIsEditorReadOnly(false);
  };
  return unsplashImageInfo ? (
    <UnsplashImage unsplashImageInfo={unsplashImageInfo} />
  ) : (
    <div className={styles.container}>
      <form className={styles.searchForm} onKeyDown={onKeyDownHandler}>
        <input
          ref={searchInputRef}
          className={styles.searchInput}
          placeholder="Type keywords to search Unsplash, and press Enter"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </form>

      {searchResults && (
        <div>
          <div className={styles.resultNavContainer}>
            {currentPage > 1 && (
              <div
                className={styles.resultPrevButton}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentPage((prev) => prev - 1);
                }}
              >
                Previsous
              </div>
            )}
            <div className={styles.resultTotalText}>
              {totalImageNumber} results
            </div>
            {totalPages && currentPage < totalPages && (
              <div
                className={styles.resultNextButton}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentPage((prev) => prev + 1);
                }}
              >
                Next
              </div>
            )}
          </div>
          <SearchResults
            searchResults={searchResults}
            onSelect={onSelectPhotoHandler}
          />
        </div>
      )}
    </div>
  );
}
