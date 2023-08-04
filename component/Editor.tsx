import styled from '@emotion/styled/macro';
import dynamic from 'next/dynamic';
import {Dispatch, SetStateAction} from 'react';
import {EditorProps, EditorState} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from './Button';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  {ssr: false},
);

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: {
  editorState: EditorState;
  readOnly?: boolean;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  onSave?: () => void;
}) {
  return (
    <>
      <Wrapper>
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          toolbarHidden={readOnly}
          toolbarClassName="editor-toolbar-hidden"
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbar={{
            options: ['inline', 'link', 'textAlign', 'list'],
          }}
          localization={{
            locale: 'ko',
          }}
          onEditorStateChange={onEditorStateChange}
        />
        {!readOnly && <Button onClick={onSave}>Save</Button>}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 16px;
`;
