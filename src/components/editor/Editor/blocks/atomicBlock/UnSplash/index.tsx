import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { EditorState, ContentBlock, SelectionState, Modifier } from 'draft-js';

import { getBlockDeletedEditorState } from '@/utils/draft';
import api from '@/apiFetch';

import styles from './style.module.scss';
import SearchResults from './SearchResults';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  block: ContentBlock;
};

export default function UnSplash({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  block,
}: Props) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState<Array<any> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsEditorReadOnly(true);
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const searchInputValue = searchInputRef.current?.value ?? '';
    updateSearchResults({ keyword: searchInputValue, currentPage });
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
    const results = data.results;
    setSearchResults(results);
  };

  const onBlurHandler = async (e) => {
    console.log(`e.target.id`, e.target.id);

    setIsEditorReadOnly(false);
    const newEditorState = getBlockDeletedEditorState({ editorState, block });
    setEditorState(newEditorState);
  };

  const onFocusHandler = async (e) => {
    setIsEditorReadOnly(true);
  };
  return (
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
        <div onMouseDown={(e) => e.preventDefault()}>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentPage((prev) => prev - 1);
            }}
          >
            previsous
          </div>
          <div>total</div>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentPage((prev) => prev + 1);
            }}
          >
            next
          </div>
          <SearchResults searchResults={searchResults} />
        </div>
      )}
    </div>
  );
}
