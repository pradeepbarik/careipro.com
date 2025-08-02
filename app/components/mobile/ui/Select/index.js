import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text, { Ecolor } from '../text';
import classes from './style.module.scss';

// export type IDropDownItem = {
// name: string;
// value: any;
// };

// interface TDropDownProps {
// dropDownItem: Array<IDropDownItem>;
// label: string;
// type: 'single' | 'multiple';
// required?: boolean;
// className?: string;
// onSelectItem: (items: IDropDownItem[]) => void;
// searchfilter?: boolean;
// value?:any[]
// }

const Dropdown = ({
    dropDownItem = [],
    label,
    type,
    onSelectItem,
    required,
    className = '',
    searchfilter = false,
    value
}) => {
    // * Required State's * //
    const [options, setOptions] = useState(dropDownItem);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');

    // * Function to handle click on single selected item's * //
    const handleClickOnSingleSelect = (_selected) => {
        onSelectItem([_selected]);
        setSelectedItems([_selected]);
        setIsOpen(false);
        if (searchfilter) {
            setSearchText('');
            setOptions(dropDownItem);
        }
    };

    // * Function to handle click on single selected item's * //
    const handleClickOnMultiSelect = (_selected) => {
        onSelectItem([...selectedItems, _selected]);
        setSelectedItems([...selectedItems, _selected]);
    };
    const handelSearch = (e) => {
        let val = e.target.value;
        setSearchText(val);
        if (val === '') {
            setOptions(dropDownItem);
            return;
        }
        let newoptions = dropDownItem.filter((opt) => {
            return opt.name.toLowerCase().includes(val.toLowerCase())
        });
        setOptions(newoptions);
    }
    useEffect(() => {
        setOptions(dropDownItem);
    }, [JSON.stringify(dropDownItem)])
    useEffect(() => {
        console.log('dropDownItem', dropDownItem);
        console.log('value', value)
        if (typeof value !== 'undefined' && value.length >= 1) {
            let items = dropDownItem.filter((item) => {
                return value.indexOf(item.value) !== -1
            })
            setSelectedItems(items);
        }

    }, [JSON.stringify(value)])
    return (
        <div className={className ? `${className} ${classes.container}` :
            classes.container}>
            <div className={isOpen ? classes.overlay : classes.hide} onClick={()
                => { setIsOpen(false) }} ></div>
            <Text color={Ecolor.deep} required={required}>
                {label}
            </Text>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={classes.selectContainer}
            >
                {selectedItems.map((element, i) => {
                    if (type === 'single') {
                        return <div key={`select_item_${i}_${element.value}`}
                            className={classes.selectedItem}>{element.name}</div>;
                    }

                    return (
                        <div className={classes.multiSelectCnt}>
                            <span className={classes.selectedItem}>{element.name}</span>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    );
                })}
            </div>
            <div className={classes.dropDownContainer} data-isopen={isOpen}>
                {(searchfilter && isOpen) &&
                    <div className={classes.searchFilter}>
                        <BsSearch />
                        <input type='text' value={searchText} autoFocus={true}
                            onChange={handelSearch} />
                    </div>
                }
                {isOpen &&
                    options.length > 0 &&
                    options.map(
                        (element, index) => {
                            if (type === 'single') {
                                return (
                                    <div
                                        key={`${index}-${element.value}`}
                                        onClick={() => handleClickOnSingleSelect(element)}
                                        className={classes.dropDownItme}
                                    >
                                        {element.name}
                                    </div>
                                );
                            }
                            return (
                                <div className={classes.multiDrpDnCont}>
                                    <input
                                        type="checkbox"
                                        value={element.value}
                                        onChange={() => handleClickOnMultiSelect(element)}
                                    />
                                    <p className={classes.dropDownItme}>{element.name}</p>
                                </div>
                            );
                        }
                    )}
            </div>
        </div>
    );
};

export default Dropdown;