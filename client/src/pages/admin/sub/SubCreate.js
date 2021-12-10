import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import {
  createSub,
  getSubs,
  removeSub,
  getSingleSub,
} from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategeryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState('');
  // step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSubs = () => getSubs().then((res) => setSubs(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name: name, parent: category }, user.token) // give parent
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setName('');
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} is deleted successfully`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // Step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading</h4>
          ) : (
            <h4>Create sub category</h4>
          )}
          <div className='form-group'>
            <label>Parent Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategeryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* Step 2 and Step 3*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* Step 5 */}
          {subs.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className='btn btn-sm float-right ml-auto'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className='btn btn-sm float-right ml-auto'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
